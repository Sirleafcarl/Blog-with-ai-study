<template>
    <div>
        <!-- 顶部操作栏 -->
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <el-input
                    v-model="keyword"
                    placeholder="搜索笔记标题..."
                    clearable
                    class="w-64"
                    @keyup.enter="handleSearch"
                    @clear="handleSearch">
                    <template #prefix><el-icon><Search /></el-icon></template>
                </el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
                <el-button :icon="RefreshRight" @click="handleReset">重置</el-button>
            </div>
            <el-button type="success" :icon="EditPen" @click="openCreateDialog">新建笔记</el-button>
        </div>

        <!-- 笔记列表 -->
        <el-table :data="tableData" v-loading="tableLoading" border stripe>
            <el-table-column label="标题" prop="title" min-width="180" show-overflow-tooltip />
            <el-table-column label="内容摘要" prop="summary" min-width="220" show-overflow-tooltip />
            <el-table-column label="更新时间" prop="updateTime" width="150" />
            <el-table-column label="创建时间" prop="createTime" width="150" />
            <el-table-column label="操作" width="320" fixed="right">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button
                        size="small"
                        type="warning"
                        :loading="scope.row._generating"
                        @click="handleGenerateQuestions(scope.row)">
                        🧩 生成题目
                    </el-button>
                    <el-button
                        size="small"
                        type="success"
                        :loading="scope.row._reviewing"
                        @click="handleReviewNote(scope.row)">
                        ✨ AI批改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="flex justify-center mt-4">
            <el-pagination
                background
                layout="prev, pager, next, total"
                :total="total"
                :page-size="size"
                v-model:current-page="current"
                @current-change="getTableData" />
        </div>

        <!-- AI 结果对话框 -->
        <el-dialog
            v-model="aiDialogVisible"
            :title="aiDialogTitle"
            width="700px"
            top="5vh">
            <div v-loading="aiLoading" style="min-height: 100px;">
                <div
                    v-if="aiResult"
                    style="white-space: pre-wrap; line-height: 1.8; font-size: 14px; max-height: 65vh; overflow-y: auto; padding: 8px;">
                    {{ aiResult }}
                </div>
                <el-empty v-else-if="!aiLoading" description="暂无结果" />
            </div>
            <template #footer>
                <el-button @click="aiDialogVisible = false">关闭</el-button>
            </template>
        </el-dialog>

        <!-- 新建 / 编辑笔记对话框 -->
        <el-dialog
            v-model="dialogVisible"
            :title="isEdit ? '编辑笔记' : '新建笔记'"
            fullscreen
            :show-close="false"
            :modal="false">
            <template #header>
                <div class="flex items-center justify-between">
                    <h4 class="font-bold text-base">{{ isEdit ? '编辑笔记' : '新建笔记' }}</h4>
                    <div class="flex gap-2">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">保存</el-button>
                    </div>
                </div>
            </template>

            <el-form :model="form" ref="formRef" label-position="top" :rules="rules">
                <el-form-item label="笔记标题" prop="title">
                    <el-input
                        v-model="form.title"
                        placeholder="请输入笔记标题"
                        maxlength="200"
                        show-word-limit
                        size="large" />
                </el-form-item>
                <el-form-item label="笔记内容" prop="content">
                    <MdEditor
                        v-model="form.content"
                        editorId="noteEditor"
                        style="width: 100%; min-height: 500px;" />
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Search, RefreshRight, EditPen } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { showMessage } from '@/composables/util'
import { createNote, updateNote, deleteNote, getNoteDetail, getNotePageList } from '@/api/admin/note'
import { generateQuestions, reviewNote } from '@/api/admin/ai'

// ---- 列表 ----
const tableData = ref([])
const tableLoading = ref(false)
const current = ref(1)
const total = ref(0)
const size = ref(10)
const keyword = ref('')

function getTableData() {
    tableLoading.value = true
    getNotePageList({ current: current.value, size: size.value, keyword: keyword.value || null })
        .then(res => {
            if (res.success) {
                tableData.value = res.data || []
                total.value = res.total || 0
            }
        })
        .finally(() => { tableLoading.value = false })
}
getTableData()

function handleSearch() {
    current.value = 1
    getTableData()
}

function handleReset() {
    keyword.value = ''
    current.value = 1
    getTableData()
}

// ---- 对话框 ----
const dialogVisible = ref(false)
const isEdit = ref(false)
const submitLoading = ref(false)
const formRef = ref(null)
const form = reactive({ id: null, title: '', content: '' })

const rules = {
    title: [{ required: true, message: '请输入笔记标题', trigger: 'blur' }]
}

function openCreateDialog() {
    isEdit.value = false
    form.id = null
    form.title = ''
    form.content = ''
    dialogVisible.value = true
}

function handleEdit(row) {
    isEdit.value = true
    // 加载完整内容
    getNoteDetail(row.id).then(res => {
        if (res.success) {
            form.id = res.data.id
            form.title = res.data.title
            form.content = res.data.content || ''
            dialogVisible.value = true
        } else {
            showMessage(res.message || '加载失败', 'error')
        }
    })
}

function handleDelete(row) {
    ElMessageBox.confirm(`确认删除笔记「${row.title}」？`, '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        deleteNote(row.id).then(res => {
            if (res.success) {
                showMessage('删除成功', 'success')
                getTableData()
            } else {
                showMessage(res.message || '删除失败', 'error')
            }
        })
    }).catch(() => {})
}

function handleSubmit() {
    formRef.value.validate(valid => {
        if (!valid) return
        submitLoading.value = true
        const req = isEdit.value
            ? updateNote({ id: form.id, title: form.title, content: form.content })
            : createNote({ title: form.title, content: form.content })

        req.then(res => {
            if (res.success) {
                showMessage(isEdit.value ? '保存成功' : '创建成功', 'success')
                dialogVisible.value = false
                getTableData()
            } else {
                showMessage(res.message || '操作失败', 'error')
            }
        }).finally(() => { submitLoading.value = false })
    })
}

// ---- AI 功能 ----
const aiDialogVisible = ref(false)
const aiDialogTitle = ref('')
const aiResult = ref('')
const aiLoading = ref(false)

function handleGenerateQuestions(row) {
    aiDialogTitle.value = `🧩 生成题目 —— 「${row.title}」`
    aiResult.value = ''
    aiLoading.value = true
    aiDialogVisible.value = true
    row._generating = true

    generateQuestions(row.id)
        .then(res => {
            if (res.success) {
                aiResult.value = res.data
            } else {
                aiResult.value = '生成失败：' + (res.message || '未知错误')
            }
        })
        .catch(() => { aiResult.value = '请求异常，请稍后重试' })
        .finally(() => {
            aiLoading.value = false
            row._generating = false
        })
}

function handleReviewNote(row) {
    aiDialogTitle.value = `✨ AI 批改 —— 「${row.title}」`
    aiResult.value = ''
    aiLoading.value = true
    aiDialogVisible.value = true
    row._reviewing = true

    reviewNote(row.id)
        .then(res => {
            if (res.success) {
                aiResult.value = res.data
            } else {
                aiResult.value = '批改失败：' + (res.message || '未知错误')
            }
        })
        .catch(() => { aiResult.value = '请求异常，请稍后重试' })
        .finally(() => {
            aiLoading.value = false
            row._reviewing = false
        })
}
</script>
