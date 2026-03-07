<template>
    
    <el-card shadow="never" :body-style="{ padding: '20px' }" class="mb-5 border-1">
        <!-- card body -->
        <el-text class="mx-1 mr-3">文章标题</el-text>
        <el-input v-model="searchTitle" placeholder="请输入（模糊查询）" class="w-50 mr-5" />

        <el-text class="mx-1 mr-3">发布日期</el-text>
        <el-date-picker style="top: 3px" v-model="pickDate" type="daterange" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间" :shortcuts="shortcuts" size="default" @change="datepickerChange" />

            <el-button type="primary" class="ml-3" :icon="Search" @click="getTableData">查询</el-button>
            <el-button class="ml-3" :icon="RefreshRight" @click="reset">重置</el-button>

        <!-- 快速状态筛选 -->
        <div class="mt-3 flex gap-2">
            <span class="text-sm text-gray-500 mr-1 self-center">状态：</span>
            <el-button
                v-for="sf in statusFilters"
                :key="sf.value"
                :type="statusFilter === sf.value ? 'primary' : 'default'"
                size="small"
                @click="switchStatusFilter(sf.value)">
                {{ sf.label }}
            </el-button>
        </div>
    </el-card>


    <el-card shadow="never" class="border-1">
        <!-- card body -->
        <!-- 新增按钮 -->
        <div>
            <el-button type="primary" @click="isArticlePublishEditorShow = true">
                <el-icon class="mr-1">
                    <EditPen />
                </el-icon>
                写文章</el-button>
        </div>

        <el-table :data="tableData" stripe style="width: 100%" class="mt-4" v-loading="tableLoading">
            <el-table-column prop="title" label="标题" width="380" />
            <el-table-column label="预览图" width="180">
                <template #default="scope">
                    <el-image style="width: 50px;" :src="scope.row.titleImage" />
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="180" />
            <el-table-column label="投稿人" width="120">
                <template #default="scope">
                    <span v-if="scope.row.authorUsername" class="text-blue-500 text-sm">{{ scope.row.authorUsername }}</span>
                    <span v-else class="text-gray-400 text-sm">管理员</span>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" width="100">
                <template #default="scope">
                    <el-tag v-if="scope.row.status === 1" type="warning" size="small">审核中</el-tag>
                    <el-tag v-else-if="scope.row.status === 3" type="danger" size="small">已拒绝</el-tag>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column label="置顶" width="90">
                <template #default="scope">
                    <el-switch v-model="scope.row.isTop" @change="onStatusChange(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column label="已发布" width="90">
                <template #default="scope">
                    <el-switch v-model="scope.row.isPublished" @change="onStatusChange(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="240" fixed="right">
                <template #default="scope">
                    <el-space wrap :size="6">
                        <el-button size="small" @click="showArticleUpdateEditorShow(scope.row)">
                            <el-icon class="mr-1"><Edit /></el-icon>编辑
                        </el-button>
                        <el-button size="small" @click="previewArticle(scope.row)">
                            <el-icon class="mr-1"><View /></el-icon>预览
                        </el-button>
                        <el-button type="danger" size="small" @click="deleteArticleSubmit(scope.row)">
                            <el-icon class="mr-1"><Delete /></el-icon>删除
                        </el-button>
                        <el-button
                            v-if="scope.row.status === 1"
                            type="success"
                            size="small"
                            @click="openAuditDialog(scope.row)">审核</el-button>
                    </el-space>
                </template>
            </el-table-column>
        </el-table>

        <div class="mt-5 flex item-center justify-center">
            <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 20, 50]" :small="small"
                :disabled="disabled" background="true" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="getTableData" />
        </div>
    </el-card>

    <!-- 写博客 -->
    <el-dialog v-model="isArticlePublishEditorShow" fullscreen :show-close="false" :modal="false"
        :body-style="{ padding: '0', overflow: 'hidden' }">
        <template #header>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-1 h-5 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span class="font-semibold text-gray-800 text-base">写文章</span>
                </div>
                <div class="flex gap-2">
                    <el-button @click="isArticlePublishEditorShow = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit">
                        <el-icon class="mr-1"><Promotion /></el-icon>发布
                    </el-button>
                </div>
            </div>
        </template>
        <el-form :model="form" ref="publishArticleFormRef" label-position="top" :rules="rules"
            style="display:flex; height:calc(100vh - 56px); overflow:hidden;">
            <!-- 左侧：标题 + 编辑器 -->
            <div style="flex:1; display:flex; flex-direction:column; padding:16px 12px 0 20px; min-width:0; overflow:hidden;">
                <el-form-item prop="title" style="margin-bottom:12px;">
                    <el-input v-model="form.title" placeholder="请输入文章标题..." size="large"
                        maxlength="40" show-word-limit clearable />
                </el-form-item>
                <el-form-item prop="content" style="flex:1; margin-bottom:0; min-height:0;">
                    <MdEditor v-model="form.content" @onUploadImg="onUploadImg"
                        editorId="publishArticleEditor" style="height:calc(100vh - 166px);" />
                </el-form-item>
            </div>
            <!-- 右侧：元数据面板 -->
            <div style="width:282px; border-left:1px solid #f0f0f0; background:#fafafa; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px;">
                <!-- 封面图 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">封面图</p>
                    <el-form-item prop="titleImage" style="margin-bottom:0">
                        <el-upload class="avatar-uploader" action="#" :on-change="handleTitleImageChange"
                            :auto-upload="false" :show-file-list="false" :on-success="handleAvatarSuccess">
                            <img v-if="form.titleImage" :src="form.titleImage" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-form-item>
                </div>
                <!-- 文章摘要 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">摘要</p>
                    <el-form-item prop="description" style="margin-bottom:0">
                        <el-input v-model="form.description" :rows="4" type="textarea" placeholder="请输入文章摘要" />
                    </el-form-item>
                </div>
                <!-- 分类 & 标签 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">分类 &amp; 标签</p>
                    <el-form-item label="分类" prop="categoryId">
                        <el-select v-model="form.categoryId" clearable placeholder="请选择分类" style="width:100%">
                            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签" prop="tags" style="margin-bottom:0">
                        <el-select v-model="form.tags" multiple filterable remote reserve-keyword placeholder="请输入标签"
                            remote-show-suffix :remote-method="remoteMethod" allow-create default-first-option
                            :loading="tagSelectLoading" style="width:100%">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                </div>
                <!-- 文章设置 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">文章设置</p>
                    <div class="flex items-center justify-between py-2 border-b border-gray-50">
                        <div>
                            <p class="text-sm text-gray-700 font-medium">置顶</p>
                            <p class="text-xs text-gray-400">固定在列表顶部</p>
                        </div>
                        <el-switch v-model="form.isTop" />
                    </div>
                    <div class="flex items-center justify-between pt-2">
                        <div>
                            <p class="text-sm text-gray-700 font-medium">立即发布</p>
                            <p class="text-xs text-gray-400">公开可见</p>
                        </div>
                        <el-switch v-model="form.isPublished" />
                    </div>
                </div>
                <!-- AI 写作助手 -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <p class="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-3 flex items-center gap-1">
                        <el-icon><MagicStick /></el-icon> AI 写作助手
                    </p>
                    <el-input v-model="aiTopic" placeholder="输入文章题目..." size="small" clearable />
                    <el-button type="primary" size="small" class="mt-2 w-full" :loading="aiGenerating" @click="handleAiGenerate('publish')">
                        一键生成内容
                    </el-button>
                    <p class="text-xs text-blue-400 mt-2 leading-relaxed">AI 将根据题目生成 Markdown 文章草稿，可在编辑器中修改。</p>
                </div>
                <!-- AI 润色 & 纠错 -->
                <div class="bg-gradient-to-br from-violet-50 to-pink-50 rounded-xl p-4 border border-violet-100">
                    <p class="text-xs font-semibold text-violet-500 uppercase tracking-wide mb-3 flex items-center gap-1">
                        <el-icon><MagicStick /></el-icon> AI 润色 &amp; 纠错
                    </p>
                    <el-radio-group v-model="aiPolishMode" size="small" class="mb-2" style="width:100%;display:flex">
                        <el-radio-button label="polish" style="flex:1">润色</el-radio-button>
                        <el-radio-button label="proofread" style="flex:1">纠错</el-radio-button>
                        <el-radio-button label="optimize" style="flex:1">建议</el-radio-button>
                    </el-radio-group>
                    <el-button type="primary" plain size="small" class="mt-1 w-full" :loading="aiPolishing" @click="handleAiPolish">
                        分析当前内容
                    </el-button>
                    <p class="text-xs text-violet-400 mt-2 leading-relaxed">对已编写的内容进行润色、纠错或提供优化建议。</p>
                </div>
            </div>
        </el-form>
    </el-dialog>

    <!-- 编辑博客 -->
    <el-dialog v-model="isArticleUpdateEditorShow" fullscreen :show-close="false" :modal="false"
        :body-style="{ padding: '0', overflow: 'hidden' }">
        <template #header>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-1 h-5 rounded-full bg-indigo-500 flex-shrink-0"></div>
                    <span class="font-semibold text-gray-800 text-base">编辑文章</span>
                </div>
                <div class="flex gap-2">
                    <el-button @click="hideArticleUpdateEditor">取消</el-button>
                    <el-button type="primary" @click="updateSubmit">
                        <el-icon class="mr-1"><Promotion /></el-icon>保存
                    </el-button>
                </div>
            </div>
        </template>
        <el-form :model="form" ref="updateArticleFormRef" label-position="top" :rules="rules"
            style="display:flex; height:calc(100vh - 56px); overflow:hidden;">
            <!-- 左侧：标题 + 编辑器 -->
            <div style="flex:1; display:flex; flex-direction:column; padding:16px 12px 0 20px; min-width:0; overflow:hidden;">
                <el-form-item prop="title" style="margin-bottom:12px;">
                    <el-input v-model="form.title" placeholder="请输入文章标题..." size="large"
                        maxlength="40" show-word-limit clearable />
                </el-form-item>
                <el-form-item prop="content" style="flex:1; margin-bottom:0; min-height:0;">
                    <MdEditor v-model="form.content" @onUploadImg="onUploadImg"
                        editorId="updateArticleEditor" style="height:calc(100vh - 166px);" />
                </el-form-item>
            </div>
            <!-- 右侧：元数据面板 -->
            <div style="width:282px; border-left:1px solid #f0f0f0; background:#fafafa; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px;">
                <!-- 封面图 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">封面图</p>
                    <el-form-item prop="titleImage" style="margin-bottom:0">
                        <el-upload class="avatar-uploader" action="#" :on-change="handleTitleImageChange"
                            :auto-upload="false" :show-file-list="false" :on-success="handleAvatarSuccess">
                            <img v-if="form.titleImage" :src="form.titleImage" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-form-item>
                </div>
                <!-- 文章摘要 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">摘要</p>
                    <el-form-item prop="description" style="margin-bottom:0">
                        <el-input v-model="form.description" :rows="4" type="textarea" placeholder="请输入文章摘要" />
                    </el-form-item>
                </div>
                <!-- 分类 & 标签 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">分类 &amp; 标签</p>
                    <el-form-item label="分类" prop="categoryId">
                        <el-select v-model="form.categoryId" clearable placeholder="请选择分类" style="width:100%">
                            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签" prop="tags" style="margin-bottom:0">
                        <el-select v-model="form.tags" multiple filterable remote reserve-keyword placeholder="请输入标签"
                            remote-show-suffix :remote-method="remoteMethod" allow-create default-first-option
                            :loading="tagSelectLoading" style="width:100%">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                </div>
                <!-- 文章设置 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">文章设置</p>
                    <div class="flex items-center justify-between py-2 border-b border-gray-50">
                        <div>
                            <p class="text-sm text-gray-700 font-medium">置顶</p>
                            <p class="text-xs text-gray-400">固定在列表顶部</p>
                        </div>
                        <el-switch v-model="form.isTop" />
                    </div>
                    <div class="flex items-center justify-between pt-2">
                        <div>
                            <p class="text-sm text-gray-700 font-medium">立即发布</p>
                            <p class="text-xs text-gray-400">公开可见</p>
                        </div>
                        <el-switch v-model="form.isPublished" />
                    </div>
                </div>
                <!-- AI 写作助手 -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <p class="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-3 flex items-center gap-1">
                        <el-icon><MagicStick /></el-icon> AI 写作助手
                    </p>
                    <el-input v-model="aiTopic" placeholder="输入文章题目..." size="small" clearable />
                    <el-button type="primary" size="small" class="mt-2 w-full" :loading="aiGenerating" @click="handleAiGenerate('edit')">
                        一键生成内容
                    </el-button>
                    <p class="text-xs text-blue-400 mt-2 leading-relaxed">AI 将根据题目生成 Markdown 文章草稿，可在编辑器中修改。</p>
                </div>
                <!-- AI 润色 & 纠错 -->
                <div class="bg-gradient-to-br from-violet-50 to-pink-50 rounded-xl p-4 border border-violet-100">
                    <p class="text-xs font-semibold text-violet-500 uppercase tracking-wide mb-3 flex items-center gap-1">
                        <el-icon><MagicStick /></el-icon> AI 润色 &amp; 纠错
                    </p>
                    <el-radio-group v-model="aiPolishMode" size="small" class="mb-2" style="width:100%;display:flex">
                        <el-radio-button label="polish" style="flex:1">润色</el-radio-button>
                        <el-radio-button label="proofread" style="flex:1">纠错</el-radio-button>
                        <el-radio-button label="optimize" style="flex:1">建议</el-radio-button>
                    </el-radio-group>
                    <el-button type="primary" plain size="small" class="mt-1 w-full" :loading="aiPolishing" @click="handleAiPolish">
                        分析当前内容
                    </el-button>
                    <p class="text-xs text-violet-400 mt-2 leading-relaxed">对已编写的内容进行润色、纠错或提供优化建议。</p>
                </div>
            </div>
        </el-form>
    </el-dialog>

    <!-- 审核对话框 -->
    <el-dialog v-model="auditDialogVisible" title="审核用户投稿文章" width="480px">
        <div class="mb-4 text-gray-600">
            <span class="font-medium">文章：</span>{{ auditArticleRow?.title }}
            <span v-if="auditArticleRow?.authorUsername" class="ml-3 text-sm text-gray-400">投稿人：{{ auditArticleRow.authorUsername }}</span>
        </div>
        <el-form :model="auditForm" label-width="80px">
            <el-form-item label="审核结果">
                <el-radio-group v-model="auditForm.action">
                    <el-radio :label="2">通过并发布</el-radio>
                    <el-radio :label="3">拒绝</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="auditForm.action === 3" label="拒绝原因">
                <el-input v-model="auditForm.rejectReason" type="textarea" :rows="3" placeholder="请输入拒绝原因（可选）" maxlength="300" show-word-limit />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="auditDialogVisible = false">取消</el-button>
            <el-button type="primary" :loading="auditSubmitting" @click="submitAudit">提交审核</el-button>
        </template>
    </el-dialog>

    <!-- AI 润色/纠错 结果对话框 -->
    <el-dialog v-model="aiPolishDialogVisible" :title="aiPolishDialogTitle" width="680px" :close-on-click-modal="false"
        :body-style="{ padding: '20px', maxHeight: '70vh', overflow: 'auto' }">
        <div class="mb-3 flex items-center gap-2">
            <el-tag :type="aiPolishMode === 'proofread' ? 'danger' : aiPolishMode === 'optimize' ? 'warning' : 'success'" size="small">
                {{ { proofread: '纠错', optimize: '优化建议', polish: '润色' }[aiPolishMode] }}
            </el-tag>
            <span class="text-xs text-gray-400">AI 分析已完成，以下是结果</span>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
            <div class="ai-md-content" v-html="aiPolishResultHtml"></div>
        </div>
        <template #footer>
            <el-button @click="aiPolishDialogVisible = false">关闭</el-button>
            <el-button v-if="aiPolishMode === 'polish'" type="primary" @click="applyPolishResult">
                替换为润色版本
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { publishArticle, getArticlePageList, deleteArticle, getArticleDetail, updateArticle, updateArticleStatus, auditArticle } from '@/api/admin/article'
import { uploadFile } from '@/api/admin/file'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import MarkdownIt from 'markdown-it'
import { showMessage } from '@/composables/util'
import { useRouter } from 'vue-router'
import { getCategorySelect } from '@/api/admin/category'
import { selectTags, getTagSelect } from '@/api/admin/tag'
import moment from 'moment';
import { Search, RefreshRight, MagicStick } from '@element-plus/icons-vue'
import { generateArticleContent, polishArticleContent } from '@/api/admin/ai'
import { ElMessageBox } from 'element-plus'

const router = useRouter()

// ---- 状态筛选 ----
const statusFilters = [
    { label: '全部',   value: null },
    { label: '审核中', value: 1 },
    { label: '已发布', value: 2 },
    { label: '已拒绝', value: 3 },
]
const statusFilter = ref(null)
const switchStatusFilter = (val) => {
    statusFilter.value = val
    current.value = 1
    getTableData()
}

const isArticlePublishEditorShow = ref(false)
const isArticleUpdateEditorShow = ref(false)
const tableLoading = ref(false)

const searchTitle = ref('')
const pickDate = ref('')
const startDate = reactive({})
const endDate = reactive({})

const reset = () => {
    pickDate.value = ''
    startDate.value = null
    endDate.value = null
    searchTitle.value = ''
}

const datepickerChange = (e) => {
    startDate.value = moment(e[0]).format('YYYY-MM-DD HH:mm:ss')
    endDate.value = moment(e[1]).format('YYYY-MM-DD HH:mm:ss')
}

const shortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]

const handleTitleImageChange = (file) => {
    console.log('开始上传文件')
    console.log(file)
    let formData = new FormData()
    formData.append("file", file.raw);
    uploadFile(formData).then((e) => {
        if (e.success == false) {
            let message = e.message
            showMessage(message, 'warning', 'message')
            return
        }
        form.titleImage = e.data.url
        showMessage('文章题图上传成功', 'success', 'message')
    })
}

const hideArticleUpdateEditor = () => {
    isArticleUpdateEditorShow.value = false
    form.title = ''
    form.content = '请输入内容'
    form.titleImage = ''
    form.categoryId = null
    form.tags = []
    form.isTop = false
    form.isPublished = true
}

const showArticleUpdateEditorShow = (row) => {
    isArticleUpdateEditorShow.value = true
    let articleId = row.id
    getArticleDetail(articleId).then((e) => {
        if (e.success == true) {
            form.id = e.data.id
            form.title = e.data.title
            form.content = e.data.content
            form.titleImage = e.data.titleImage
            form.categoryId = e.data.categoryId
            form.tags = e.data.tagIds
            form.description = e.data.description
            form.isTop = e.data.isTop ?? false
            form.isPublished = e.data.isPublished ?? true
        }
    })
}

const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
        files.map((file) => {
            return new Promise((rev, rej) => {
                console.log('==> 开始上传文件...')
                let formData = new FormData()
                formData.append("file", file);
                uploadFile(formData).then((res) => {
                    console.log(res)
                    console.log('访问路径：' + res.data.url)
                    callback([res.data.url]);
                })
            });
        })
    );
}

const previewArticle = (row) => {
    // 打开一个新页面
    let routeData = router.resolve({ path: '/article/detail', query: { articleId: row.id } });
    window.open(routeData.href, '_blank');
}

const onStatusChange = (row) => {
    updateArticleStatus({ id: row.id, isTop: row.isTop, isPublished: row.isPublished }).then((e) => {
        if (e.success) {
            showMessage('更新成功', 'success', 'message')
        } else {
            showMessage(e.message || '更新失败', 'warning', 'message')
            getTableData()
        }
    }).catch(() => {
        showMessage('请求失败', 'error', 'message')
        getTableData()
    })
}

const form = reactive({
    id: null,
    title: '',
    content: '请输入内容',
    titleImage: '',
    categoryId: null,
    tags: [],
    description: "",
    isTop: false,
    isPublished: true
})


const publishArticleFormRef = ref(null)
const updateArticleFormRef = ref(null)
const aiTopic = ref('')
const aiGenerating = ref(false)
const aiPolishMode = ref('polish')
const aiPolishing = ref(false)
const aiPolishResult = ref('')
const aiPolishDialogVisible = ref(false)
const aiPolishDialogTitle = ref('AI 分析结果')
const _md = new MarkdownIt({ html: false, linkify: true, typographer: true })
const aiPolishResultHtml = computed(() => _md.render(aiPolishResult.value || ''))

const handleAiGenerate = async () => {
    if (!aiTopic.value.trim()) {
        showMessage('请输入文章题目', 'warning', 'message')
        return
    }
    aiGenerating.value = true
    try {
        const res = await generateArticleContent(aiTopic.value.trim())
        if (res.success) {
            form.content = res.data
            showMessage('AI 内容生成成功，已填入编辑器', 'success', 'message')
        } else {
            showMessage(res.message || 'AI 生成失败', 'error', 'message')
        }
    } catch (e) {
        showMessage('AI 生成失败：' + (e.message || '未知错误'), 'error', 'message')
    } finally {
        aiGenerating.value = false
    }
}

const handleAiPolish = async () => {
    if (!form.content || !form.content.trim()) {
        showMessage('编辑器内容为空，请先编写文章', 'warning', 'message')
        return
    }
    aiPolishing.value = true
    const modeLabel = { proofread: '纠错', optimize: '优化建议', polish: '润色' }[aiPolishMode.value] || 'AI'
    aiPolishDialogTitle.value = `AI 分析结果 — ${modeLabel}`
    try {
        const res = await polishArticleContent(form.content, aiPolishMode.value)
        if (res.success) {
            aiPolishResult.value = res.data
            aiPolishDialogVisible.value = true
        } else {
            showMessage(res.message || 'AI 分析失败', 'error', 'message')
        }
    } catch (e) {
        showMessage('AI 分析失败：' + (e.message || '未知错误'), 'error', 'message')
    } finally {
        aiPolishing.value = false
    }
}

const applyPolishResult = () => {
    form.content = aiPolishResult.value
    aiPolishDialogVisible.value = false
    showMessage('已替换为润色版本', 'success', 'message')
}
const rules = {
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        { min: 1, max: 40, message: '文章标题要求大于1个字符，小于40个字符', trigger: 'blur' },
    ],
    content: [{ required: true }],
    titleImage: [{ required: true }],
    categoryId: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
    tags: [{ required: true, message: '请选择文章标签', trigger: 'blur' }],
    description: [{ required: true, message: '请输入文章摘要', trigger: 'blur' }],
}


// const handleMd = (md) => {
//     form.content = md
//     console.log('子组件回传过来的数据：' + form.content)
// }

const tableData = ref([])
// 当前页码
const current = ref(1)
const total = ref(0)
const size = ref(10)

// 获取分页数据
function getTableData() {
    console.log('获取分页数据')
    tableLoading.value = true
    getArticlePageList({ current: current.value, size: size.value, startDate: startDate.value, endDate: endDate.value, searchTitle: searchTitle.value, status: statusFilter.value })
        .then((res) => {
            if (res.success == true) {
                tableData.value = res.data.records
                current.value = res.data.current
                total.value = res.data.total
                size.value = res.data.size
            }
        }).finally(() => {
            tableLoading.value = false
        })
}
getTableData()

const handleSizeChange = (e) => {
    console.log('选择的页码' + e)
    size.value = e
    getTableData()
}


const onSubmit = () => {
    isArticlePublishEditorShow.value = true
    console.log('提交内容' + form.content)
    publishArticleFormRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        // Ensure content is always a string, not object
        if (typeof form.content === 'object' && form.content !== null) {
            form.content = JSON.stringify(form.content)
        }
        publishArticle(form).then((e) => {
        console.log(e)
        if (e.success == false) {
            var message = e.message
            showMessage(message, 'warning', 'message')
            return
        }

        showMessage('发布成功', 'success', 'message')
        isArticlePublishEditorShow.value = false
        location.reload()
    }).catch((err) => {
        console.error('[publishArticle error]', err)
        showMessage('请求失败: ' + (err.message || '未知错误'), 'error', 'message')
    })
    })
}

const updateSubmit = () => {
    isArticleUpdateEditorShow.value = true
    console.log('提交内容' + form.content)
    updateArticleFormRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        // Ensure content is always a string, not object
        if (typeof form.content === 'object' && form.content !== null) {
            form.content = JSON.stringify(form.content)
        }
        updateArticle(form).then((e) => {
        console.log(e)
        if (e.success == false) {
            var message = e.message
            showMessage(message, 'warning', 'message')
            return
        }

        showMessage('修改成功', 'success', 'message')
        isArticleUpdateEditorShow.value = false
        location.reload()
    }).catch((err) => {
        console.error('[updateArticle error]', err)
        showMessage('请求失败: ' + (err.message || '未知错误'), 'error', 'message')
    })
    })
}

const deleteArticleSubmit = (row) => {
    console.log(row.id)
    ElMessageBox.confirm(
        '是否确认要删除该文章?',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteArticle(row.id).then((e) => {
                if (e.success == true) {
                    showMessage('删除成功', 'success')
                    location.reload()
                } else {
                    let message = e.message
                    showMessage(message, 'warning')
                }
            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除失败',
            })
        })
}

// 文章分类
const categories = ref([])
getCategorySelect().then((e) => {
    console.log('获取分类数据')
    console.log(e)
    categories.value = e.data
})

// 文章标签
const tagSelectLoading = ref(false)
const options = ref([])
getTagSelect().then((e) => {
    console.log('获取标签数据')
    console.log(e)
    options.value = e.data
})

const remoteMethod = (query) => {
    console.log('远程搜索')
    console.log(options.value)
    if (query) {
        tagSelectLoading.value = true
        setTimeout(() => {
            tagSelectLoading.value = false
            selectTags(query).then((e) => {
                if (e.success) {
                    options.value = e.data
                }
            })
        }, 200)
    }
}

// ---- 审核 ----
const auditDialogVisible = ref(false)
const auditArticleRow    = ref(null)
const auditSubmitting    = ref(false)
const auditForm = reactive({ action: 2, rejectReason: '' })

const openAuditDialog = (row) => {
    auditArticleRow.value = row
    auditForm.action = 2
    auditForm.rejectReason = ''
    auditDialogVisible.value = true
}

const submitAudit = async () => {
    if (auditForm.action === 3 && !auditForm.rejectReason.trim()) {
        // Allow empty reject reason – just warn
    }
    auditSubmitting.value = true
    try {
        const res = await auditArticle({
            articleId: auditArticleRow.value.id,
            action: auditForm.action,
            rejectReason: auditForm.rejectReason,
        })
        if (res.success) {
            showMessage(auditForm.action === 2 ? '已通过并发布' : '已拒绝', 'success')
            auditDialogVisible.value = false
            getTableData()
        } else {
            showMessage(res.message || '审核失败', 'error')
        }
    } catch (e) {
        showMessage('请求失败', 'error')
    } finally {
        auditSubmitting.value = false
    }
}
</script>


<style scoped>
.avatar-uploader .avatar {
    width: 278px;
    display: block;
}

.message {
    z-index: 9999 !important;
}
</style>

<style>
.w-50 {
    width: 12.5rem!important;
}

.mr-3 {
    margin-right: 0.75rem!important;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

/* AI Response Markdown Rendering */
.ai-md-content { font-size: 14px; line-height: 1.7; color: #374151; word-break: break-word; }
.ai-md-content h1, .ai-md-content h2, .ai-md-content h3,
.ai-md-content h4, .ai-md-content h5, .ai-md-content h6 { font-weight: 600; margin: 16px 0 8px; color: #111827; line-height: 1.4; }
.ai-md-content h1 { font-size: 1.5em; }
.ai-md-content h2 { font-size: 1.25em; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
.ai-md-content h3 { font-size: 1.1em; color: #1e3a8a; }
.ai-md-content p { margin: 8px 0; }
.ai-md-content ul, .ai-md-content ol { padding-left: 1.6em; margin: 8px 0; }
.ai-md-content li { margin: 4px 0; }
.ai-md-content ul li { list-style-type: disc; }
.ai-md-content ol li { list-style-type: decimal; }
.ai-md-content strong { font-weight: 700; color: #111827; }
.ai-md-content em { font-style: italic; }
.ai-md-content code { background: #f3f4f6; padding: 1px 5px; border-radius: 4px; font-family: 'Consolas','Monaco',monospace; font-size: 0.88em; color: #db2777; }
.ai-md-content pre { background: #1f2937; color: #f8fafc; padding: 14px 16px; border-radius: 8px; overflow-x: auto; margin: 12px 0; }
.ai-md-content pre code { background: transparent; color: inherit; padding: 0; font-size: 0.85em; }
.ai-md-content blockquote { border-left: 4px solid #3b82f6; padding: 4px 14px; margin: 10px 0; color: #6b7280; background: #eff6ff; border-radius: 0 6px 6px 0; }
.ai-md-content table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 0.9em; }
.ai-md-content th, .ai-md-content td { border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; }
.ai-md-content th { background: #f3f4f6; font-weight: 600; color: #374151; }
.ai-md-content tr:nth-child(even) td { background: #f9fafb; }
.ai-md-content hr { border: none; border-top: 2px solid #e5e7eb; margin: 18px 0; }
.ai-md-content a { color: #3b82f6; text-decoration: underline; }




</style>