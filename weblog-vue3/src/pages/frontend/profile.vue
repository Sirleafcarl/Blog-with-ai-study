<template>
    <Header></Header>

    <div class="max-w-screen-lg mx-auto px-4 py-8">

        <!-- 头像 + 昵称区域 -->
        <div class="flex flex-col items-center mb-8">
            <div class="relative">
                <img
                    :src="profile.avatar || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'"
                    class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    alt="avatar"
                />
            </div>
            <h2 class="mt-3 text-2xl font-bold text-gray-800 dark:text-white">
                {{ profile.nickname || profile.username }}
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ profile.bio || '这个人很懒，什么都没写~' }}</p>
            <button
                @click="openEditDialog"
                class="mt-4 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                个人资料
            </button>
        </div>

        <!-- Tab 导航 -->
        <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li v-for="tab in tabs" :key="tab.key" class="mr-2">
                    <button
                        @click="activeTab = tab.key"
                        :class="[
                            'inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group',
                            activeTab === tab.key
                                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                        ]">
                        {{ tab.label }}
                    </button>
                </li>
            </ul>
        </div>

        <!-- Tab 内容 -->
        <div>
            <!-- 我的笔记（占位） -->
            <div v-if="activeTab === 'notes'" class="text-center text-gray-400 py-16">
                <svg class="mx-auto w-12 h-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7l-5-5H5a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                <p>笔记功能即将上线</p>
            </div>

            <!-- 我的博客 -->
            <div v-if="activeTab === 'blogs'">
                <!-- 操作栏 -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex gap-2">
                        <el-button
                            v-for="f in articleStatusFilters"
                            :key="f.value"
                            :type="blogStatusFilter === f.value ? 'primary' : 'default'"
                            size="small"
                            @click="switchBlogFilter(f.value)">
                            {{ f.label }}
                        </el-button>
                    </div>
                    <el-button type="primary" size="small" @click="openWriteDialog">
                        ✏️ 写文章
                    </el-button>
                </div>

                <!-- 文章列表 -->
                <el-table :data="articleList" stripe style="width:100%" v-loading="articleLoading" empty-text="暂无文章">
                    <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
                    <el-table-column label="状态" width="100">
                        <template #default="scope">
                            <el-tag :type="statusTagType(scope.row.status)" size="small">
                                {{ statusLabel(scope.row.status) }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="160" />
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <el-button
                                size="small"
                                :disabled="scope.row.status !== 0 && scope.row.status !== 3"
                                @click="editArticle(scope.row)">编辑</el-button>
                            <el-button
                                type="danger"
                                size="small"
                                @click="handleDeleteArticle(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <div class="mt-4 flex justify-center">
                    <el-pagination
                        v-model:current-page="articlePage"
                        v-model:page-size="articleSize"
                        :page-sizes="[10, 20]"
                        background
                        layout="total, sizes, prev, pager, next"
                        :total="articleTotal"
                        @size-change="loadMyArticles"
                        @current-change="loadMyArticles" />
                </div>

                <!-- 拒绝原因提示 -->
                <div v-if="rejectedArticle" class="mt-3 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                    <strong>{{ rejectedArticle.title }}</strong> 被拒绝：{{ rejectedArticle.rejectReason || '未说明原因' }}
                </div>
            </div>

            <!-- AI历史（占位） -->
            <div v-if="activeTab === 'ai'" class="text-center text-gray-400 py-16">
                <svg class="mx-auto w-12 h-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                <p>AI历史功能即将上线</p>
            </div>

            <!-- 我的点赞 -->
            <div v-if="activeTab === 'likes'">
                <div v-loading="likesLoading">
                    <div v-if="likesList.length === 0 && !likesLoading" class="text-center text-gray-400 py-16">
                        <svg class="mx-auto w-12 h-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        <p>还没有点赞的文章</p>
                    </div>
                    <div v-else class="space-y-4">
                        <div v-for="item in likesList" :key="item.id"
                             @click="$router.push({ path: '/article/detail', query: { articleId: item.id } })"
                             class="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 dark:border-gray-700">
                            <img v-if="item.titleImage" :src="item.titleImage" class="w-24 h-16 rounded object-cover flex-shrink-0" />
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base font-semibold text-gray-800 dark:text-white truncate">{{ item.title }}</h3>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ item.description }}</p>
                                <span class="mt-1 text-xs text-gray-400">{{ item.createTime }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-center" v-if="likesTotal > likesSize">
                        <el-pagination
                            v-model:current-page="likesPage"
                            v-model:page-size="likesSize"
                            :page-sizes="[10, 20]"
                            background
                            layout="total, sizes, prev, pager, next"
                            :total="likesTotal"
                            @size-change="loadMyLikes"
                            @current-change="loadMyLikes" />
                    </div>
                </div>
            </div>

            <!-- 我的收藏 -->
            <div v-if="activeTab === 'collects'">
                <div v-loading="favoritesLoading">
                    <div v-if="favoritesList.length === 0 && !favoritesLoading" class="text-center text-gray-400 py-16">
                        <svg class="mx-auto w-12 h-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                        <p>还没有收藏的文章</p>
                    </div>
                    <div v-else class="space-y-4">
                        <div v-for="item in favoritesList" :key="item.id"
                             @click="$router.push({ path: '/article/detail', query: { articleId: item.id } })"
                             class="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 dark:border-gray-700">
                            <img v-if="item.titleImage" :src="item.titleImage" class="w-24 h-16 rounded object-cover flex-shrink-0" />
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base font-semibold text-gray-800 dark:text-white truncate">{{ item.title }}</h3>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ item.description }}</p>
                                <span class="mt-1 text-xs text-gray-400">{{ item.createTime }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-center" v-if="favoritesTotal > favoritesSize">
                        <el-pagination
                            v-model:current-page="favoritesPage"
                            v-model:page-size="favoritesSize"
                            :page-sizes="[10, 20]"
                            background
                            layout="total, sizes, prev, pager, next"
                            :total="favoritesTotal"
                            @size-change="loadMyFavorites"
                            @current-change="loadMyFavorites" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 个人资料编辑弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑个人资料" width="480px" destroy-on-close>
        <el-tabs v-model="editTab">
            <!-- 基本资料 -->
            <el-tab-pane label="基本资料" name="basic">
                <el-form :model="editForm" label-width="80px" class="mt-2">
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                            :http-request="handleAvatarUpload"
                            accept="image/*"
                        >
                            <img v-if="editForm.avatar" :src="editForm.avatar" class="w-20 h-20 rounded-full object-cover" />
                            <div v-else class="w-20 h-20 rounded-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-300 hover:border-blue-400 cursor-pointer">
                                <el-icon class="text-2xl"><Plus /></el-icon>
                                <span class="text-xs mt-1">上传头像</span>
                            </div>
                            <div v-if="editForm.avatar" class="mt-2 text-xs text-gray-400 text-center cursor-pointer hover:text-blue-500">点击更换</div>
                        </el-upload>
                        <span v-if="avatarUploading" class="ml-3 text-sm text-gray-500">上传中...</span>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="editForm.nickname" placeholder="请输入昵称" maxlength="60" show-word-limit clearable />
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="editForm.email" placeholder="请输入邮箱" clearable />
                    </el-form-item>
                    <el-form-item label="个人简介">
                        <el-input v-model="editForm.bio" type="textarea" :rows="3" placeholder="介绍一下自己吧~" maxlength="256" show-word-limit />
                    </el-form-item>
                </el-form>
            </el-tab-pane>

            <!-- 修改密码 -->
            <el-tab-pane label="修改密码" name="password">
                <el-form :model="pwdForm" label-width="80px" class="mt-2">
                    <el-form-item label="原密码">
                        <el-input v-model="pwdForm.oldPassword" type="password" show-password placeholder="请输入原密码" />
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="pwdForm.newPassword" type="password" show-password placeholder="6-60个字符" />
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="pwdForm.confirmPassword" type="password" show-password placeholder="再次输入新密码" />
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        <template #footer>
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" :loading="saving" @click="saveEdit">保存</el-button>
        </template>
    </el-dialog>

    <Footer></Footer>

    <!-- 写文章 / 编辑文章 对话框 -->
    <el-dialog v-model="articleDialogVisible" :title="articleDialogTitle" fullscreen :show-close="false" :modal="false">
        <template #header>
            <div class="flex items-center justify-between px-4 py-2 border-b">
                <h4 class="font-bold text-lg">{{ articleDialogTitle }}</h4>
                <div class="flex gap-2">
                    <el-button @click="articleDialogVisible = false">取消</el-button>
                    <el-button @click="doSubmitArticle(true)" :loading="articleSaving">保存草稿</el-button>
                    <el-button type="primary" @click="doSubmitArticle(false)" :loading="articleSaving">提交审核</el-button>
                </div>
            </div>
        </template>

        <el-form :model="articleForm" label-position="top" class="p-4">
            <el-form-item label="标题">
                <el-input v-model="articleForm.title" placeholder="请输入文章标题" maxlength="40" show-word-limit clearable />
            </el-form-item>
            <el-form-item label="摘要">
                <el-input v-model="articleForm.description" type="textarea" :rows="2" placeholder="请输入文章摘要（160字以内）" maxlength="160" show-word-limit />
            </el-form-item>
            <el-form-item label="内容">
                <MdEditor v-model="articleForm.content" editorId="userArticleEditor" style="width:100%" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="articleForm.categoryId" placeholder="请选择分类" clearable style="width:200px">
                    <el-option v-for="c in categoryOptions" :key="c.value" :label="c.label" :value="c.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="标签">
                <el-select
                    v-model="articleForm.tags"
                    multiple filterable remote
                    allow-create default-first-option
                    :remote-method="searchTags"
                    placeholder="输入标签名称"
                    style="width:400px">
                    <el-option v-for="t in tagOptions" :key="t.value" :label="t.label" :value="t.value" />
                </el-select>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import Header from '@/layouts/components/Header.vue'
import Footer from '@/layouts/components/Footer.vue'
import { getUserProfile, updateUserProfile, updateUserPassword, uploadAvatar } from '@/api/frontend/user'
import { submitUserArticle, updateUserArticle, deleteUserArticle, getMyArticleList, getMyArticleDetail } from '@/api/frontend/userArticle'
import { getMyLikedArticles, getMyFavoritedArticles } from '@/api/frontend/interaction'
import { getCategorySelect } from '@/api/admin/category'
import { selectTags } from '@/api/admin/tag'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { showMessage } from '@/composables/util'
import { ElMessageBox } from 'element-plus'

const route = useRoute()

// Tab 配置
const tabs = [
    { key: 'notes',    label: '我的笔记' },
    { key: 'blogs',    label: '我的博客' },
    { key: 'ai',       label: 'AI历史' },
    { key: 'likes',    label: '我的点赞' },
    { key: 'collects', label: '我的收藏' },
]
const activeTab = ref('notes')

// 个人资料
const profile = reactive({
    username: '',
    nickname: '',
    avatar: '',
    email: '',
    bio: '',
})

const loadProfile = async () => {
    try {
        const res = await getUserProfile()
        if (res.success) {
            Object.assign(profile, res.data)
        }
    } catch (e) {
        showMessage('获取个人资料失败', 'error')
    }
}

onMounted(async () => {
    await loadProfile()
    // 支持从导航栏 ?tab=blogs&write=1 直接打开写文章
    if (route.query.tab) {
        activeTab.value = route.query.tab
    }
    if (route.query.write === '1') {
        activeTab.value = 'blogs'
        openWriteDialog()
    }
})

// 编辑弹窗
const editDialogVisible = ref(false)
const editTab = ref('basic')
const saving = ref(false)

const editForm = reactive({ nickname: '', avatar: '', email: '', bio: '' })
const pwdForm = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })
const avatarUploading = ref(false)

const beforeAvatarUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isImage) { showMessage('只能上传图片文件', 'warning'); return false }
    if (!isLt2M)  { showMessage('图片大小不能超过 2MB', 'warning'); return false }
    return true
}

const handleAvatarUpload = async ({ file }) => {
    avatarUploading.value = true
    try {
        const res = await uploadAvatar(file)
        if (res.success) {
            editForm.avatar = res.data.url
            showMessage('头像上传成功', 'success')
        } else {
            showMessage(res.message || '上传失败', 'error')
        }
    } catch (e) {
        showMessage('上传失败', 'error')
    } finally {
        avatarUploading.value = false
    }
}

const openEditDialog = () => {
    editTab.value = 'basic'
    editForm.nickname = profile.nickname
    editForm.avatar   = profile.avatar
    editForm.email    = profile.email
    editForm.bio      = profile.bio
    pwdForm.oldPassword = ''
    pwdForm.newPassword = ''
    pwdForm.confirmPassword = ''
    editDialogVisible.value = true
}

const saveEdit = async () => {
    saving.value = true
    try {
        if (editTab.value === 'basic') {
            const res = await updateUserProfile({
                nickname: editForm.nickname,
                avatar:   editForm.avatar,
                email:    editForm.email,
                bio:      editForm.bio,
            })
            if (res.success) {
                Object.assign(profile, editForm)
                showMessage('保存成功', 'success')
                editDialogVisible.value = false
            } else {
                showMessage(res.message || '保存失败', 'error')
            }
        } else {
            if (!pwdForm.oldPassword || !pwdForm.newPassword) {
                showMessage('请填写完整密码信息', 'warning')
                return
            }
            if (pwdForm.newPassword !== pwdForm.confirmPassword) {
                showMessage('两次输入的新密码不一致', 'warning')
                return
            }
            const res = await updateUserPassword({
                oldPassword: pwdForm.oldPassword,
                newPassword: pwdForm.newPassword,
            })
            if (res.success) {
                showMessage('密码修改成功，请重新登录', 'success')
                editDialogVisible.value = false
            } else {
                showMessage(res.message || '密码修改失败', 'error')
            }
        }
    } finally {
        saving.value = false
    }
}

// ===================== 我的博客 =====================
const articleStatusFilters = [
    { label: '全部',     value: null },
    { label: '草稿',     value: 0 },
    { label: '审核中',   value: 1 },
    { label: '已发布',   value: 2 },
    { label: '已拒绝',   value: 3 },
]
const blogStatusFilter   = ref(null)
const articleList        = ref([])
const articleTotal       = ref(0)
const articleLoading     = ref(false)
const articlePage        = ref(1)
const articleSize        = ref(10)
const rejectedArticle    = ref(null)

const statusLabel = (s) => ({ 0: '草稿', 1: '审核中', 2: '已发布', 3: '已拒绝' }[s] ?? '未知')
const statusTagType = (s) => ({ 0: 'info', 1: 'warning', 2: 'success', 3: 'danger' }[s] ?? '')

const loadMyArticles = async () => {
    articleLoading.value = true
    rejectedArticle.value = null
    try {
        const res = await getMyArticleList({
            current: articlePage.value,
            size: articleSize.value,
            status: blogStatusFilter.value,
        })
        if (res.success) {
            articleList.value  = res.data.records || []
            articleTotal.value = res.data.total   || 0
            // Highlight first rejected article
            const rej = articleList.value.find(a => a.status === 3)
            if (rej) rejectedArticle.value = rej
        }
    } catch (e) {
        showMessage('加载文章列表失败', 'error')
    } finally {
        articleLoading.value = false
    }
}

const switchBlogFilter = (val) => {
    blogStatusFilter.value = val
    articlePage.value = 1
    loadMyArticles()
}

// ===================== 我的点赞 =====================
const likesList     = ref([])
const likesTotal    = ref(0)
const likesLoading  = ref(false)
const likesPage     = ref(1)
const likesSize     = ref(10)

const loadMyLikes = async () => {
    likesLoading.value = true
    try {
        const res = await getMyLikedArticles(likesPage.value, likesSize.value)
        if (res.success) {
            likesList.value  = res.data.records || []
            likesTotal.value = res.data.total   || 0
        }
    } catch (e) {
        showMessage('加载点赞列表失败', 'error')
    } finally {
        likesLoading.value = false
    }
}

// ===================== 我的收藏 =====================
const favoritesList     = ref([])
const favoritesTotal    = ref(0)
const favoritesLoading  = ref(false)
const favoritesPage     = ref(1)
const favoritesSize     = ref(10)

const loadMyFavorites = async () => {
    favoritesLoading.value = true
    try {
        const res = await getMyFavoritedArticles(favoritesPage.value, favoritesSize.value)
        if (res.success) {
            favoritesList.value  = res.data.records || []
            favoritesTotal.value = res.data.total   || 0
        }
    } catch (e) {
        showMessage('加载收藏列表失败', 'error')
    } finally {
        favoritesLoading.value = false
    }
}

// Watch tab change to load data
watch(activeTab, (val) => {
    if (val === 'blogs') {
        loadCategoryOptions()
        loadMyArticles()
    } else if (val === 'likes') {
        loadMyLikes()
    } else if (val === 'collects') {
        loadMyFavorites()
    }
})

// ---- Article dialog ----
const articleDialogVisible = ref(false)
const articleDialogTitle   = ref('写文章')
const articleSaving        = ref(false)
const editingArticleId     = ref(null)

const articleForm = reactive({
    title: '',
    content: '',
    description: '',
    titleImage: '',
    categoryId: null,
    tags: [],
})

const categoryOptions = ref([])
const tagOptions      = ref([])

const loadCategoryOptions = async () => {
    if (categoryOptions.value.length) return
    try {
        const res = await getCategorySelect()
        if (res.success) categoryOptions.value = res.data || []
    } catch (_) {}
}

const searchTags = async (key) => {
    if (!key) return
    try {
        const res = await selectTags(key)
        if (res.success) tagOptions.value = (res.data || []).map(t => ({ label: t.name, value: t.name }))
    } catch (_) {}
}

const resetArticleForm = () => {
    articleForm.title       = ''
    articleForm.content     = ''
    articleForm.description = ''
    articleForm.titleImage  = ''
    articleForm.categoryId  = null
    articleForm.tags        = []
    editingArticleId.value  = null
}

const openWriteDialog = async () => {
    resetArticleForm()
    articleDialogTitle.value = '写文章'
    await loadCategoryOptions()
    articleDialogVisible.value = true
}

const editArticle = async (row) => {
    resetArticleForm()
    articleDialogTitle.value = '编辑文章'
    await loadCategoryOptions()
    try {
        const res = await getMyArticleDetail(row.id)
        if (res.success) {
            const d = res.data
            articleForm.title       = d.title       || ''
            articleForm.content     = d.content     || ''
            articleForm.description = d.description || ''
            articleForm.titleImage  = d.titleImage  || ''
            articleForm.categoryId  = d.categoryId  || null
            articleForm.tags        = (d.tagIds || []).map(String)
            editingArticleId.value  = row.id
        }
    } catch (_) {
        showMessage('加载文章详情失败', 'error')
        return
    }
    articleDialogVisible.value = true
}

const doSubmitArticle = async (isDraft) => {
    if (!articleForm.title.trim()) { showMessage('标题不能为空', 'warning'); return }
    if (!articleForm.content.trim()) { showMessage('内容不能为空', 'warning'); return }
    if (!articleForm.description.trim()) { showMessage('摘要不能为空', 'warning'); return }
    if (!articleForm.categoryId) { showMessage('请选择分类', 'warning'); return }

    articleSaving.value = true
    try {
        const payload = { ...articleForm, isDraft }
        let res
        if (editingArticleId.value) {
            res = await updateUserArticle({ ...payload, id: editingArticleId.value })
        } else {
            res = await submitUserArticle(payload)
        }
        if (res.success) {
            showMessage(isDraft ? '草稿已保存' : '已提交审核，等待管理员审核', 'success')
            articleDialogVisible.value = false
            loadMyArticles()
        } else {
            showMessage(res.message || '操作失败', 'error')
        }
    } catch (e) {
        showMessage('操作失败', 'error')
    } finally {
        articleSaving.value = false
    }
}

const handleDeleteArticle = async (row) => {
    try {
        await ElMessageBox.confirm(`确定删除文章「${row.title}」吗？`, '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        })
        const res = await deleteUserArticle(row.id)
        if (res.success) {
            showMessage('删除成功', 'success')
            loadMyArticles()
        } else {
            showMessage(res.message || '删除失败', 'error')
        }
    } catch (_) {}
}
</script>
