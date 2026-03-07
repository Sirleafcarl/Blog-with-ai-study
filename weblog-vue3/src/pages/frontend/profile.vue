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
            <!-- 我的笔记 -->
            <div v-if="activeTab === 'notes'">
                <!-- 操作栏 -->
                <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div class="flex items-center gap-2">
                        <el-input
                            v-model="noteKeyword"
                            placeholder="搜索笔记..."
                            clearable
                            class="w-48"
                            @keyup.enter="handleNoteSearch"
                            @clear="handleNoteSearch" />
                        <el-select
                            v-model="noteFilterCategoryId"
                            placeholder="全部分类"
                            clearable
                            class="w-32"
                            @change="handleNoteSearch">
                            <el-option v-for="cat in noteCategoryList" :key="cat.id" :label="cat.name" :value="cat.id" />
                        </el-select>
                        <el-button type="primary" size="small" @click="handleNoteSearch">搜索</el-button>
                    </div>
                    <div class="flex gap-2">
                        <el-button size="small" @click="noteCategoryDialogVisible = true">分类管理</el-button>
                        <el-button type="primary" size="small" @click="openNoteCreateDialog">✏️ 新建笔记</el-button>
                    </div>
                </div>

                <!-- 笔记列表 -->
                <div v-loading="noteLoading">
                    <div v-if="noteList.length === 0 && !noteLoading" class="text-center text-gray-400 py-16">
                        <svg class="mx-auto w-12 h-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7l-5-5H5a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        <p>还没有笔记，快去创建一篇吧</p>
                    </div>
                    <div v-else class="space-y-3">
                        <div v-for="item in noteList" :key="item.id"
                             class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div class="flex items-start justify-between">
                                <div class="flex-1 min-w-0">
                                    <h3 class="text-base font-semibold text-gray-800 dark:text-white truncate">{{ item.title }}</h3>
                                    <div class="mt-1 flex items-center gap-2">
                                        <el-tag v-if="item.categoryName" size="small" type="info">{{ item.categoryName }}</el-tag>
                                        <span class="text-xs text-gray-400">{{ item.updateTime }}</span>
                                    </div>
                                    <p v-if="item.summary" class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ item.summary }}</p>
                                </div>
                                <div class="flex gap-1 ml-3 flex-shrink-0">
                                    <el-button size="small" type="primary" link @click="handleNoteEdit(item)">编辑</el-button>
                                    <el-button size="small" type="danger" link @click="handleNoteDelete(item)">删除</el-button>
                                    <el-button size="small" type="warning" link :loading="item._generating" @click="handleNoteGenerate(item)">生成题目</el-button>
                                    <el-button size="small" type="success" link :loading="item._reviewing" @click="handleNoteReview(item)">AI批改</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-center" v-if="noteTotal > noteSize">
                        <el-pagination
                            v-model:current-page="notePage"
                            v-model:page-size="noteSize"
                            :page-sizes="[10, 20]"
                            background
                            layout="total, sizes, prev, pager, next"
                            :total="noteTotal"
                            @size-change="loadMyNotes"
                            @current-change="loadMyNotes" />
                    </div>
                </div>
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

            <!-- AI历史 -->
            <div v-if="activeTab === 'ai'">
                <div v-loading="aiHistoryLoading">
                    <div v-if="aiHistoryList.length === 0 && !aiHistoryLoading" class="text-center text-gray-400 py-16">
                        <svg class="mx-auto w-12 h-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                        <p>还没有 AI 历史记录</p>
                    </div>
                    <div v-else class="space-y-3">
                        <div v-for="item in aiHistoryList" :key="item.id"
                             class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2 flex-1 min-w-0">
                                    <el-tag :type="item.type === 'quiz' ? 'warning' : 'success'" size="small">
                                        {{ item.type === 'quiz' ? '🧩 答题' : '✨ 批改' }}
                                    </el-tag>
                                    <span class="font-medium text-gray-800 dark:text-white truncate">{{ item.noteTitle }}</span>
                                    <span v-if="item.type === 'quiz' && item.score != null"
                                          class="text-sm font-bold"
                                          :class="item.score >= 60 ? 'text-green-600' : 'text-red-500'">
                                        {{ item.score }}分
                                    </span>
                                </div>
                                <div class="flex items-center gap-2 flex-shrink-0 ml-3">
                                    <span class="text-xs text-gray-400">{{ item.createTime }}</span>
                                    <el-button size="small" type="primary" link @click="viewAiHistoryDetail(item)">查看</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-center" v-if="aiHistoryTotal > aiHistorySize">
                        <el-pagination
                            v-model:current-page="aiHistoryPage"
                            v-model:page-size="aiHistorySize"
                            :page-sizes="[10, 20]"
                            background
                            layout="total, sizes, prev, pager, next"
                            :total="aiHistoryTotal"
                            @size-change="loadAiHistory"
                            @current-change="loadAiHistory" />
                    </div>
                </div>
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
    <el-dialog v-model="articleDialogVisible" :title="articleDialogTitle" fullscreen :show-close="false" :modal="false"
        :body-style="{ padding: '0', overflow: 'hidden' }">
        <template #header>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-1 h-5 rounded-full flex-shrink-0"
                        :class="articleDialogTitle === '写文章' ? 'bg-blue-500' : 'bg-indigo-500'"></div>
                    <span class="font-semibold text-gray-800 text-base">{{ articleDialogTitle }}</span>
                </div>
                <div class="flex gap-2">
                    <el-button @click="articleDialogVisible = false">取消</el-button>
                    <el-button @click="doSubmitArticle(true)" :loading="articleSaving">保存草稿</el-button>
                    <el-button type="primary" @click="doSubmitArticle(false)" :loading="articleSaving">提交审核</el-button>
                </div>
            </div>
        </template>

        <el-form :model="articleForm" label-position="top"
            style="display:flex; height:calc(100vh - 56px); overflow:hidden;">
            <!-- 左侧：标题 + 编辑器 -->
            <div style="flex:1; display:flex; flex-direction:column; padding:16px 12px 0 20px; min-width:0; overflow:hidden;">
                <el-form-item style="margin-bottom:12px;">
                    <el-input v-model="articleForm.title" placeholder="请输入文章标题..." size="large"
                        maxlength="40" show-word-limit clearable />
                </el-form-item>
                <el-form-item style="flex:1; margin-bottom:0; min-height:0;">
                    <MdEditor v-model="articleForm.content" editorId="userArticleEditor"
                        style="height:calc(100vh - 166px); width:100%;" />
                </el-form-item>
            </div>
            <!-- 右侧：元数据面板 -->
            <div style="width:282px; border-left:1px solid #f0f0f0; background:#fafafa; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px;">
                <!-- 封面图上传 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">封面图</p>
                    <el-upload
                        class="article-cover-uploader"
                        action="#"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="handleArticleCoverChange">
                        <img v-if="articleForm.titleImage" :src="articleForm.titleImage"
                            class="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition" alt="cover" />
                        <div v-else
                            class="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                            <el-icon class="text-2xl text-gray-300 mb-1"><Plus /></el-icon>
                            <span class="text-xs text-gray-400">点击上传封面图</span>
                        </div>
                    </el-upload>
                    <el-button v-if="articleForm.titleImage" link type="danger" size="small" class="mt-1"
                        @click="articleForm.titleImage = ''">移除图片</el-button>
                </div>
                <!-- 摘要 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">摘要</p>
                    <el-input v-model="articleForm.description" type="textarea" :rows="4"
                        placeholder="请输入文章摘要（160字以内）" maxlength="160" show-word-limit />
                </div>
                <!-- 分类 & 标签 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">分类 &amp; 标签</p>
                    <el-form-item label="分类">
                        <el-select v-model="articleForm.categoryId" placeholder="请选择分类" clearable style="width:100%">
                            <el-option v-for="c in categoryOptions" :key="c.value" :label="c.label" :value="c.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签" style="margin-bottom:0">
                        <el-select
                            v-model="articleForm.tags"
                            multiple filterable remote
                            allow-create default-first-option
                            :remote-method="searchTags"
                            placeholder="输入标签名称"
                            style="width:100%">
                            <el-option v-for="t in tagOptions" :key="t.value" :label="t.label" :value="t.value" />
                        </el-select>
                    </el-form-item>
                </div>
                <!-- 提示 -->
                <div class="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <p class="text-xs text-amber-700 font-medium mb-1">投稿说明</p>
                    <p class="text-xs text-amber-600 leading-relaxed">文章提交后将进入审核队列，审核通过后方可公开展示。草稿随时可编辑。</p>
                </div>
                <!-- AI 写作助手 -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <p class="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-3 flex items-center gap-1">
                        <el-icon><MagicStick /></el-icon> AI 写作助手
                    </p>
                    <el-input v-model="aiArticleTopic" placeholder="输入文章题目..." size="small" clearable />
                    <el-button type="primary" size="small" class="mt-2 w-full" :loading="aiArticleGenerating" @click="handleAiArticleGenerate">
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

    <!-- 新建/编辑笔记对话框 -->
    <el-dialog
        v-model="noteDialogVisible"
        :title="noteIsEdit ? '编辑笔记' : '新建笔记'"
        fullscreen
        :show-close="false"
        :modal="false">
        <template #header>
            <div class="flex items-center justify-between px-4 py-2 border-b">
                <h4 class="font-bold text-lg">{{ noteIsEdit ? '编辑笔记' : '新建笔记' }}</h4>
                <div class="flex gap-2">
                    <el-button @click="noteDialogVisible = false">取消</el-button>
                    <el-button type="primary" :loading="noteSaving" @click="handleNoteSubmit">保存</el-button>
                </div>
            </div>
        </template>
        <el-form :model="noteForm" label-position="top" class="p-4">
            <el-form-item label="笔记标题">
                <el-input v-model="noteForm.title" placeholder="请输入笔记标题" maxlength="200" show-word-limit clearable />
            </el-form-item>
            <el-form-item label="笔记分类">
                <el-select v-model="noteForm.categoryId" placeholder="请选择分类（可选）" clearable style="width:200px">
                    <el-option v-for="cat in noteCategoryList" :key="cat.id" :label="cat.name" :value="cat.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="笔记内容">
                <MdEditor v-model="noteForm.content" editorId="profileNoteEditor" style="width:100%; min-height:500px" />
            </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 笔记分类管理对话框 -->
    <el-dialog v-model="noteCategoryDialogVisible" title="笔记分类管理" width="480px">
        <div class="flex gap-2 mb-4">
            <el-input v-model="newNoteCategoryName" placeholder="输入新分类名称" clearable />
            <el-button type="primary" :loading="addNoteCategoryLoading" @click="handleAddNoteCategory">添加</el-button>
        </div>
        <el-table :data="noteCategoryList" border stripe size="small">
            <el-table-column label="分类名称" prop="name" />
            <el-table-column label="操作" width="80" align="center">
                <template #default="scope">
                    <el-button size="small" type="danger" link @click="handleDeleteNoteCategory(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>

    <!-- AI 结果对话框 -->
    <el-dialog v-model="noteAiDialogVisible" :title="noteAiDialogTitle" width="750px" top="5vh">
        <div v-loading="noteAiLoading" style="min-height: 100px;">
            <!-- 答题模式 -->
            <div v-if="noteQuizMode && noteQuizQuestions.length > 0" style="max-height: 65vh; overflow-y: auto; padding: 8px;">
                <div v-for="(q, qi) in noteQuizQuestions" :key="qi" class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="font-bold mb-3 text-base">{{ q.title }}</div>
                    <div v-for="opt in q.options" :key="opt.key" class="mb-2">
                        <label
                            class="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors"
                            :class="{
                                'bg-green-100 border border-green-400': noteQuizSubmitted && opt.key === q.answer,
                                'bg-red-100 border border-red-400': noteQuizSubmitted && q.userAnswer === opt.key && opt.key !== q.answer,
                            }">
                            <input type="radio" :name="'nq'+qi" :value="opt.key" v-model="q.userAnswer" :disabled="noteQuizSubmitted" />
                            <span>{{ opt.key }}. {{ opt.text }}</span>
                        </label>
                    </div>
                    <div v-if="noteQuizSubmitted" class="mt-2 text-sm">
                        <span v-if="q.userAnswer === q.answer" class="text-green-600 font-bold">✅ 正确</span>
                        <span v-else class="text-red-500 font-bold">❌ 错误，正确答案：{{ q.answer }}</span>
                        <div v-if="q.explanation" class="mt-1 text-gray-500">💡 {{ q.explanation }}</div>
                    </div>
                </div>
                <div v-if="noteQuizSubmitted" class="text-center py-3">
                    <div class="text-xl font-bold mb-2">得分：{{ noteQuizScore }} / {{ noteQuizQuestions.length * 20 }}</div>
                    <div class="text-gray-500">答对 {{ noteQuizCorrect }} / {{ noteQuizQuestions.length }} 题</div>
                </div>
            </div>
            <!-- 普通文本模式 -->
            <div v-else-if="noteAiResult"
                style="white-space: pre-wrap; line-height: 1.8; font-size: 14px; max-height: 65vh; overflow-y: auto; padding: 8px;">
                {{ noteAiResult }}
            </div>
            <el-empty v-else-if="!noteAiLoading" description="暂无结果" />
        </div>
        <template #footer>
            <el-button v-if="noteQuizMode && !noteQuizSubmitted && noteQuizQuestions.length > 0" type="primary" @click="submitNoteQuiz">提交答题</el-button>
            <el-button @click="noteAiDialogVisible = false">关闭</el-button>
        </template>
    </el-dialog>

    <!-- AI 历史详情对话框 -->
    <el-dialog v-model="aiHistoryDetailVisible" :title="aiHistoryDetailTitle" width="750px" top="5vh">
        <div style="min-height: 100px;">
            <!-- 答题模式 -->
            <div v-if="aiHistoryDetailQuizMode && aiHistoryDetailQuestions.length > 0" style="max-height: 65vh; overflow-y: auto; padding: 8px;">
                <div v-for="(q, qi) in aiHistoryDetailQuestions" :key="qi" class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="font-bold mb-3 text-base">{{ q.title }}</div>
                    <div v-for="opt in q.options" :key="opt.key" class="mb-2">
                        <label
                            class="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors"
                            :class="{
                                'bg-green-100 border border-green-400': aiHistoryDetailSubmitted && opt.key === q.answer,
                                'bg-red-100 border border-red-400': aiHistoryDetailSubmitted && q.userAnswer === opt.key && opt.key !== q.answer,
                            }">
                            <input type="radio" :name="'hq'+qi" :value="opt.key" v-model="q.userAnswer" :disabled="aiHistoryDetailSubmitted" />
                            <span>{{ opt.key }}. {{ opt.text }}</span>
                        </label>
                    </div>
                    <div v-if="aiHistoryDetailSubmitted" class="mt-2 text-sm">
                        <span v-if="q.userAnswer === q.answer" class="text-green-600 font-bold">✅ 正确</span>
                        <span v-else class="text-red-500 font-bold">❌ 错误，正确答案：{{ q.answer }}</span>
                        <div v-if="q.explanation" class="mt-1 text-gray-500">💡 {{ q.explanation }}</div>
                    </div>
                </div>
                <div v-if="aiHistoryDetailSubmitted" class="text-center py-3">
                    <div class="text-xl font-bold mb-2">得分：{{ aiHistoryDetailScore }} / {{ aiHistoryDetailQuestions.length * 20 }}</div>
                    <div class="text-gray-500">答对 {{ aiHistoryDetailCorrect }} / {{ aiHistoryDetailQuestions.length }} 题</div>
                </div>
            </div>
            <!-- 普通文本模式 -->
            <div v-else
                style="white-space: pre-wrap; line-height: 1.8; font-size: 14px; max-height: 65vh; overflow-y: auto; padding: 8px;">
                {{ aiHistoryDetailContent }}
            </div>
        </div>
        <template #footer>
            <el-button v-if="aiHistoryDetailQuizMode && !aiHistoryDetailSubmitted && aiHistoryDetailQuestions.length > 0" type="primary" @click="submitAiHistoryQuiz">提交答题</el-button>
            <el-button @click="aiHistoryDetailVisible = false">关闭</el-button>
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
            <el-button v-if="aiPolishMode === 'polish'" type="primary" @click="applyArticlePolishResult">
                替换为润色版本
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Plus, MagicStick } from '@element-plus/icons-vue'
import Header from '@/layouts/components/Header.vue'
import Footer from '@/layouts/components/Footer.vue'
import { getUserProfile, updateUserProfile, updateUserPassword, uploadAvatar, uploadUserFile } from '@/api/frontend/user'
import { submitUserArticle, updateUserArticle, deleteUserArticle, getMyArticleList, getMyArticleDetail } from '@/api/frontend/userArticle'
import { getMyLikedArticles, getMyFavoritedArticles } from '@/api/frontend/interaction'
import { createNote, updateNote, deleteNote, getNoteDetail, getNotePageList } from '@/api/admin/note'
import { getNoteCategoryList, addNoteCategory, deleteNoteCategory } from '@/api/admin/note-category'
import { generateQuestions, reviewNote, getAiHistory, updateAiHistoryScore, generateArticleContent, polishArticleContent } from '@/api/admin/ai'
import { getCategorySelect } from '@/api/admin/category'
import { selectTags } from '@/api/admin/tag'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import MarkdownIt from 'markdown-it'
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
    // 默认加载笔记数据
    loadNoteCategories()
    loadMyNotes()
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
    if (val === 'notes') {
        loadNoteCategories()
        loadMyNotes()
    } else if (val === 'blogs') {
        loadCategoryOptions()
        loadMyArticles()
    } else if (val === 'likes') {
        loadMyLikes()
    } else if (val === 'collects') {
        loadMyFavorites()
    } else if (val === 'ai') {
        loadAiHistory()
    }
})

// ===================== 我的笔记 =====================
const noteList              = ref([])
const noteTotal             = ref(0)
const noteLoading           = ref(false)
const notePage              = ref(1)
const noteSize              = ref(10)
const noteKeyword           = ref('')
const noteFilterCategoryId  = ref(null)

const noteCategoryList          = ref([])
const noteCategoryDialogVisible = ref(false)
const newNoteCategoryName       = ref('')
const addNoteCategoryLoading    = ref(false)

const noteDialogVisible = ref(false)
const noteIsEdit         = ref(false)
const noteSaving         = ref(false)
const noteForm           = reactive({ id: null, title: '', content: '', categoryId: null })

// AI
const noteAiDialogVisible = ref(false)
const noteAiDialogTitle   = ref('')
const noteAiResult        = ref('')
const noteAiLoading       = ref(false)
const noteQuizMode        = ref(false)
const noteQuizQuestions   = ref([])
const noteQuizSubmitted   = ref(false)
const noteQuizScore       = ref(0)
const noteQuizCorrect     = ref(0)

const loadNoteCategories = async () => {
    try {
        const res = await getNoteCategoryList()
        if (res.success) noteCategoryList.value = res.data || []
    } catch (_) {}
}

const loadMyNotes = async () => {
    noteLoading.value = true
    try {
        const res = await getNotePageList({
            current: notePage.value,
            size: noteSize.value,
            keyword: noteKeyword.value || null,
            categoryId: noteFilterCategoryId.value || null,
        })
        if (res.success) {
            noteList.value  = res.data || []
            noteTotal.value = res.total || 0
        }
    } catch (e) {
        showMessage('加载笔记列表失败', 'error')
    } finally {
        noteLoading.value = false
    }
}

const handleNoteSearch = () => {
    notePage.value = 1
    loadMyNotes()
}

const openNoteCreateDialog = () => {
    noteIsEdit.value = false
    noteForm.id = null
    noteForm.title = ''
    noteForm.content = ''
    noteForm.categoryId = null
    noteDialogVisible.value = true
}

const handleNoteEdit = async (row) => {
    noteIsEdit.value = true
    try {
        const res = await getNoteDetail(row.id)
        if (res.success) {
            noteForm.id = res.data.id
            noteForm.title = res.data.title
            noteForm.content = res.data.content || ''
            noteForm.categoryId = res.data.categoryId || null
            noteDialogVisible.value = true
        } else {
            showMessage(res.message || '加载失败', 'error')
        }
    } catch (_) {
        showMessage('加载笔记详情失败', 'error')
    }
}

const handleNoteDelete = (row) => {
    ElMessageBox.confirm(`确认删除笔记「${row.title}」？`, '提示', {
        confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning'
    }).then(async () => {
        const res = await deleteNote(row.id)
        if (res.success) {
            showMessage('删除成功', 'success')
            loadMyNotes()
        } else {
            showMessage(res.message || '删除失败', 'error')
        }
    }).catch(() => {})
}

const handleNoteSubmit = async () => {
    if (!noteForm.title.trim()) { showMessage('请输入笔记标题', 'warning'); return }
    noteSaving.value = true
    try {
        const req = noteIsEdit.value
            ? updateNote({ id: noteForm.id, title: noteForm.title, content: noteForm.content, categoryId: noteForm.categoryId })
            : createNote({ title: noteForm.title, content: noteForm.content, categoryId: noteForm.categoryId })
        const res = await req
        if (res.success) {
            showMessage(noteIsEdit.value ? '保存成功' : '创建成功', 'success')
            noteDialogVisible.value = false
            loadMyNotes()
        } else {
            showMessage(res.message || '操作失败', 'error')
        }
    } finally {
        noteSaving.value = false
    }
}

// 分类管理
const handleAddNoteCategory = async () => {
    if (!newNoteCategoryName.value || !newNoteCategoryName.value.trim()) {
        showMessage('请输入分类名称', 'warning'); return
    }
    addNoteCategoryLoading.value = true
    try {
        const res = await addNoteCategory({ name: newNoteCategoryName.value.trim() })
        if (res.success) {
            showMessage('添加成功', 'success')
            newNoteCategoryName.value = ''
            loadNoteCategories()
        } else {
            showMessage(res.message || '添加失败', 'error')
        }
    } finally {
        addNoteCategoryLoading.value = false
    }
}

const handleDeleteNoteCategory = (row) => {
    ElMessageBox.confirm(`确认删除分类「${row.name}」？`, '提示', {
        confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning'
    }).then(async () => {
        const res = await deleteNoteCategory(row.id)
        if (res.success) {
            showMessage('删除成功', 'success')
            loadNoteCategories()
        } else {
            showMessage(res.message || '删除失败', 'error')
        }
    }).catch(() => {})
}

// AI 功能
function parseNoteQuestions(text) {
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

const submitNoteQuiz = () => {
    let correct = 0
    for (const q of noteQuizQuestions.value) {
        if (q.userAnswer === q.answer) correct++
    }
    noteQuizCorrect.value = correct
    noteQuizScore.value = correct * 20
    noteQuizSubmitted.value = true
}

const handleNoteGenerate = (row) => {
    noteAiDialogTitle.value = `🧩 答题练习 —— 「${row.title}」`
    noteAiResult.value = ''
    noteQuizMode.value = true
    noteQuizQuestions.value = []
    noteQuizSubmitted.value = false
    noteQuizScore.value = 0
    noteQuizCorrect.value = 0
    noteAiLoading.value = true
    noteAiDialogVisible.value = true
    row._generating = true

    generateQuestions(row.id)
        .then(res => {
            if (res.success) {
                noteAiResult.value = res.data
                const parsed = parseNoteQuestions(res.data)
                if (parsed.length > 0) {
                    noteQuizQuestions.value = parsed
                } else {
                    noteQuizMode.value = false
                }
            } else {
                noteQuizMode.value = false
                noteAiResult.value = '生成失败：' + (res.message || '未知错误')
            }
        })
        .catch(() => { noteQuizMode.value = false; noteAiResult.value = '请求异常，请稍后重试' })
        .finally(() => { noteAiLoading.value = false; row._generating = false })
}

const handleNoteReview = (row) => {
    noteAiDialogTitle.value = `✨ AI 批改 —— 「${row.title}」`
    noteAiResult.value = ''
    noteQuizMode.value = false
    noteAiLoading.value = true
    noteAiDialogVisible.value = true
    row._reviewing = true

    reviewNote(row.id)
        .then(res => {
            if (res.success) {
                noteAiResult.value = res.data
            } else {
                noteAiResult.value = '批改失败：' + (res.message || '未知错误')
            }
        })
        .catch(() => { noteAiResult.value = '请求异常，请稍后重试' })
        .finally(() => { noteAiLoading.value = false; row._reviewing = false })
}

// ===================== AI 历史 =====================
const aiHistoryList     = ref([])
const aiHistoryTotal    = ref(0)
const aiHistoryLoading  = ref(false)
const aiHistoryPage     = ref(1)
const aiHistorySize     = ref(10)

const aiHistoryDetailVisible    = ref(false)
const aiHistoryDetailTitle      = ref('')
const aiHistoryDetailContent    = ref('')
const aiHistoryDetailQuizMode   = ref(false)
const aiHistoryDetailQuestions  = ref([])
const aiHistoryDetailSubmitted  = ref(false)
const aiHistoryDetailScore      = ref(0)
const aiHistoryDetailCorrect    = ref(0)
const aiHistoryDetailId         = ref(null)

const loadAiHistory = async () => {
    aiHistoryLoading.value = true
    try {
        const res = await getAiHistory(aiHistoryPage.value, aiHistorySize.value)
        if (res.success) {
            aiHistoryList.value  = res.data.records || []
            aiHistoryTotal.value = res.data.total   || 0
        }
    } catch (e) {
        showMessage('加载AI历史失败', 'error')
    } finally {
        aiHistoryLoading.value = false
    }
}

const viewAiHistoryDetail = (item) => {
    aiHistoryDetailId.value = item.id
    aiHistoryDetailContent.value = item.content || ''
    aiHistoryDetailSubmitted.value = false
    aiHistoryDetailScore.value = 0
    aiHistoryDetailCorrect.value = 0

    if (item.type === 'quiz') {
        aiHistoryDetailTitle.value = `🧩 答题练习 —— 「${item.noteTitle}」`
        const parsed = parseNoteQuestions(item.content || '')
        if (parsed.length > 0) {
            aiHistoryDetailQuizMode.value = true
            aiHistoryDetailQuestions.value = parsed
            // 如果已有得分，显示为已提交
            if (item.score != null) {
                aiHistoryDetailSubmitted.value = true
                aiHistoryDetailScore.value = item.score
                aiHistoryDetailCorrect.value = Math.round(item.score / 20)
            }
        } else {
            aiHistoryDetailQuizMode.value = false
            aiHistoryDetailQuestions.value = []
        }
    } else {
        aiHistoryDetailTitle.value = `✨ AI 批改 —— 「${item.noteTitle}」`
        aiHistoryDetailQuizMode.value = false
        aiHistoryDetailQuestions.value = []
    }

    aiHistoryDetailVisible.value = true
}

const submitAiHistoryQuiz = async () => {
    let correct = 0
    for (const q of aiHistoryDetailQuestions.value) {
        if (q.userAnswer === q.answer) correct++
    }
    aiHistoryDetailCorrect.value = correct
    aiHistoryDetailScore.value = correct * 20
    aiHistoryDetailSubmitted.value = true

    // 保存得分到后端
    try {
        await updateAiHistoryScore(aiHistoryDetailId.value, correct * 20)
        // 更新列表中的得分
        const item = aiHistoryList.value.find(h => h.id === aiHistoryDetailId.value)
        if (item) item.score = correct * 20
    } catch (_) {}
}

// ---- Article dialog ----
const articleDialogVisible = ref(false)
const articleDialogTitle   = ref('写文章')
const articleSaving        = ref(false)
const editingArticleId     = ref(null)
const aiArticleTopic       = ref('')
const aiArticleGenerating  = ref(false)
const aiPolishMode         = ref('polish')
const aiPolishing          = ref(false)
const aiPolishResult       = ref('')
const aiPolishDialogVisible = ref(false)
const aiPolishDialogTitle  = ref('AI 分析结果')
const _md = new MarkdownIt({ html: false, linkify: true, typographer: true })
const aiPolishResultHtml = computed(() => _md.render(aiPolishResult.value || ''))

const handleAiPolish = async () => {
    if (!articleForm.content || !articleForm.content.trim()) {
        showMessage('编辑器内容为空，请先编写文章', 'warning')
        return
    }
    aiPolishing.value = true
    const modeLabel = { proofread: '纠错', optimize: '优化建议', polish: '润色' }[aiPolishMode.value] || 'AI'
    aiPolishDialogTitle.value = `AI 分析结果 — ${modeLabel}`
    try {
        const res = await polishArticleContent(articleForm.content, aiPolishMode.value)
        if (res.success) {
            aiPolishResult.value = res.data
            aiPolishDialogVisible.value = true
        } else {
            showMessage(res.message || 'AI 分析失败', 'error')
        }
    } catch (e) {
        showMessage('AI 分析失败：' + (e.message || '未知错误'), 'error')
    } finally {
        aiPolishing.value = false
    }
}

const applyArticlePolishResult = () => {
    articleForm.content = aiPolishResult.value
    aiPolishDialogVisible.value = false
    showMessage('已替换为润色版本', 'success')
}

const handleAiArticleGenerate = async () => {
    if (!aiArticleTopic.value.trim()) {
        showMessage('请输入文章题目', 'warning')
        return
    }
    aiArticleGenerating.value = true
    try {
        const res = await generateArticleContent(aiArticleTopic.value.trim())
        if (res.success) {
            articleForm.content = res.data
            showMessage('AI 内容生成成功，已填入编辑器', 'success')
        } else {
            showMessage(res.message || 'AI 生成失败', 'error')
        }
    } catch (e) {
        showMessage('AI 生成失败：' + (e.message || '未知错误'), 'error')
    } finally {
        aiArticleGenerating.value = false
    }
}

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

const handleArticleCoverChange = (file) => {
    const formData = new FormData()
    formData.append('file', file.raw)
    uploadUserFile(formData).then((res) => {
        if (res.success) {
            articleForm.titleImage = res.data.url
            showMessage('封面图上传成功', 'success')
        } else {
            showMessage(res.message || '上传失败', 'warning')
        }
    })
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

<style scoped>
.article-cover-uploader .el-upload {
    width: 100%;
    display: block;
}
</style>

<style>
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
