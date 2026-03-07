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
                <el-select
                    v-model="filterCategoryId"
                    placeholder="全部分类"
                    clearable
                    class="w-40"
                    @change="handleSearch">
                    <el-option
                        v-for="cat in categoryList"
                        :key="cat.id"
                        :label="cat.name"
                        :value="cat.id" />
                </el-select>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
                <el-button :icon="RefreshRight" @click="handleReset">重置</el-button>
            </div>
            <div class="flex gap-2">
                <el-button type="warning" @click="categoryDialogVisible = true">分类管理</el-button>
                <el-button type="success" :icon="EditPen" @click="openCreateDialog">新建笔记</el-button>
            </div>
        </div>

        <!-- 笔记列表 -->
        <el-table :data="tableData" v-loading="tableLoading" border stripe>
            <el-table-column label="标题" prop="title" min-width="180" show-overflow-tooltip />
            <el-table-column label="分类" width="120">
                <template #default="scope">
                    <el-tag v-if="scope.row.categoryName" size="small">{{ scope.row.categoryName }}</el-tag>
                    <span v-else class="text-gray-400">未分类</span>
                </template>
            </el-table-column>
            <el-table-column label="内容摘要" prop="summary" min-width="220" show-overflow-tooltip />
            <el-table-column label="更新时间" prop="updateTime" width="150" />
            <el-table-column label="创建时间" prop="createTime" width="150" />
            <el-table-column label="操作" width="300" fixed="right">
                <template #default="scope">
                    <el-space wrap :size="6">
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
                    </el-space>
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
            width="750px"
            top="5vh">
            <div v-loading="aiLoading" style="min-height: 100px;">
                <!-- 答题模式 -->
                <div v-if="quizMode && quizQuestions.length > 0" style="max-height: 65vh; overflow-y: auto; padding: 8px;">
                    <div v-for="(q, qi) in quizQuestions" :key="qi" class="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div class="font-bold mb-3 text-base">{{ q.title }}</div>
                        <div v-for="opt in q.options" :key="opt.key" class="mb-2">
                            <label
                                class="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors"
                                :class="{
                                    'bg-green-100 border border-green-400': quizSubmitted && opt.key === q.answer,
                                    'bg-red-100 border border-red-400': quizSubmitted && q.userAnswer === opt.key && opt.key !== q.answer,
                                }">
                                <input type="radio" :name="'q'+qi" :value="opt.key" v-model="q.userAnswer" :disabled="quizSubmitted" />
                                <span>{{ opt.key }}. {{ opt.text }}</span>
                            </label>
                        </div>
                        <div v-if="quizSubmitted" class="mt-2 text-sm">
                            <span v-if="q.userAnswer === q.answer" class="text-green-600 font-bold">✅ 正确</span>
                            <span v-else class="text-red-500 font-bold">❌ 错误，正确答案：{{ q.answer }}</span>
                            <div v-if="q.explanation" class="mt-1 text-gray-500">💡 {{ q.explanation }}</div>
                        </div>
                    </div>
                    <div v-if="quizSubmitted" class="text-center py-3">
                        <div class="text-xl font-bold mb-2">
                            得分：{{ quizScore }} / {{ quizQuestions.length * 20 }}
                        </div>
                        <div class="text-gray-500">答对 {{ quizCorrect }} / {{ quizQuestions.length }} 题</div>
                    </div>
                </div>
                <!-- 普通文本模式 -->
                <div v-else-if="aiResult"
                    style="white-space: pre-wrap; line-height: 1.8; font-size: 14px; max-height: 65vh; overflow-y: auto; padding: 8px;">
                    {{ aiResult }}
                </div>
                <el-empty v-else-if="!aiLoading" description="暂无结果" />
            </div>
            <template #footer>
                <el-button v-if="quizMode && !quizSubmitted && quizQuestions.length > 0" type="primary" @click="submitQuiz">提交答题</el-button>
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
                <el-form-item label="笔记分类">
                    <el-select v-model="form.categoryId" placeholder="请选择分类（可选）" clearable class="w-full">
                        <el-option
                            v-for="cat in categoryList"
                            :key="cat.id"
                            :label="cat.name"
                            :value="cat.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="笔记内容" prop="content">
                    <MdEditor
                        v-model="form.content"
                        editorId="noteEditor"
                        style="width: 100%; min-height: 500px;" />
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 分类管理对话框 -->
        <el-dialog v-model="categoryDialogVisible" title="笔记分类管理" width="480px">
            <div class="flex gap-2 mb-4">
                <el-input v-model="newCategoryName" placeholder="输入新分类名称" clearable />
                <el-button type="primary" :loading="addCategoryLoading" @click="handleAddCategory">添加</el-button>
            </div>
            <el-table :data="categoryList" border stripe size="small">
                <el-table-column label="分类名称" prop="name" />
                <el-table-column label="操作" width="80" align="center">
                    <template #default="scope">
                        <el-button size="small" type="danger" link @click="handleDeleteCategory(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Search, RefreshRight, EditPen } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { showMessage } from '@/composables/util'
import { createNote, updateNote, deleteNote, getNoteDetail, getNotePageList } from '@/api/admin/note'
import { generateQuestions, reviewNote } from '@/api/admin/ai'
import { getNoteCategoryList, addNoteCategory, deleteNoteCategory } from '@/api/admin/note-category'

// ---- 列表 ----
const tableData = ref([])
const tableLoading = ref(false)
const current = ref(1)
const total = ref(0)
const size = ref(10)
const keyword = ref('')
const filterCategoryId = ref(null)

// ---- 分类 ----
const categoryList = ref([])
const categoryDialogVisible = ref(false)
const newCategoryName = ref('')
const addCategoryLoading = ref(false)

function loadCategories() {
    getNoteCategoryList().then(res => {
        if (res.success) categoryList.value = res.data || []
    })
}
loadCategories()

function getTableData() {
    tableLoading.value = true
    getNotePageList({ current: current.value, size: size.value, keyword: keyword.value || null, categoryId: filterCategoryId.value || null })
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
    filterCategoryId.value = null
    current.value = 1
    getTableData()
}

// ---- 对话框 ----
const dialogVisible = ref(false)
const isEdit = ref(false)
const submitLoading = ref(false)
const formRef = ref(null)
const form = reactive({ id: null, title: '', content: '', categoryId: null })

const rules = {
    title: [{ required: true, message: '请输入笔记标题', trigger: 'blur' }]
}

function openCreateDialog() {
    isEdit.value = false
    form.id = null
    form.title = ''
    form.content = ''
    form.categoryId = null
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
            form.categoryId = res.data.categoryId || null
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
            ? updateNote({ id: form.id, title: form.title, content: form.content, categoryId: form.categoryId })
            : createNote({ title: form.title, content: form.content, categoryId: form.categoryId })

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

// ---- 答题模式 ----
const quizMode = ref(false)
const quizQuestions = ref([])
const quizSubmitted = ref(false)
const quizScore = ref(0)
const quizCorrect = ref(0)

/** 解析 AI 返回的题目文本 */
function parseQuestions(text) {
    const questions = []
    const blocks = text.split(/【第\d+题】/).filter(b => b.trim())
    for (const block of blocks) {
        const lines = block.trim().split('\n').filter(l => l.trim())
        const title = lines[0] ? lines[0].trim() : ''
        const options = []
        let answer = ''
        let explanation = ''
        for (const line of lines) {
            const optMatch = line.match(/^([A-D])[.．、]\s*(.+)/)
            if (optMatch) options.push({ key: optMatch[1], text: optMatch[2].trim() })
            const ansMatch = line.match(/【正确答案】\s*([A-D])/)
            if (ansMatch) answer = ansMatch[1]
            const expMatch = line.match(/【解析】\s*(.+)/)
            if (expMatch) explanation = expMatch[1].trim()
        }
        if (title && options.length >= 2 && answer) {
            questions.push({ title, options, answer, explanation, userAnswer: '' })
        }
    }
    return questions
}

function submitQuiz() {
    let correct = 0
    for (const q of quizQuestions.value) {
        if (q.userAnswer === q.answer) correct++
    }
    quizCorrect.value = correct
    quizScore.value = correct * 20
    quizSubmitted.value = true
}

function handleGenerateQuestions(row) {
    aiDialogTitle.value = `🧩 答题练习 —— 「${row.title}」`
    aiResult.value = ''
    quizMode.value = true
    quizQuestions.value = []
    quizSubmitted.value = false
    quizScore.value = 0
    quizCorrect.value = 0
    aiLoading.value = true
    aiDialogVisible.value = true
    row._generating = true

    generateQuestions(row.id)
        .then(res => {
            if (res.success) {
                aiResult.value = res.data
                const parsed = parseQuestions(res.data)
                if (parsed.length > 0) {
                    quizQuestions.value = parsed
                } else {
                    quizMode.value = false
                }
            } else {
                quizMode.value = false
                aiResult.value = '生成失败：' + (res.message || '未知错误')
            }
        })
        .catch(() => { quizMode.value = false; aiResult.value = '请求异常，请稍后重试' })
        .finally(() => {
            aiLoading.value = false
            row._generating = false
        })
}

function handleReviewNote(row) {
    aiDialogTitle.value = `✨ AI 批改 —— 「${row.title}」`
    aiResult.value = ''
    quizMode.value = false
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
// ---- 分类管理 ----
function handleAddCategory() {
    if (!newCategoryName.value || !newCategoryName.value.trim()) {
        showMessage('请输入分类名称', 'warning')
        return
    }
    addCategoryLoading.value = true
    addNoteCategory({ name: newCategoryName.value.trim() })
        .then(res => {
            if (res.success) {
                showMessage('添加成功', 'success')
                newCategoryName.value = ''
                loadCategories()
            } else {
                showMessage(res.message || '添加失败', 'error')
            }
        })
        .finally(() => { addCategoryLoading.value = false })
}

function handleDeleteCategory(row) {
    ElMessageBox.confirm(`确认删除分类「${row.name}」？`, '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        deleteNoteCategory(row.id).then(res => {
            if (res.success) {
                showMessage('删除成功', 'success')
                loadCategories()
            } else {
                showMessage(res.message || '删除失败', 'error')
            }
        })
    }).catch(() => {})
}
</script>
