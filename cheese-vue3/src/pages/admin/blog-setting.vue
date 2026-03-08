<template>
    <div class="max-w-3xl mx-auto">
        <!-- 页面标题 -->
        <div class="mb-6 flex items-center gap-3">
            <div class="w-1 h-6 bg-blue-500 rounded-full"></div>
            <div>
                <h2 class="text-lg font-bold text-gray-800">博客设置</h2>
                <p class="text-xs text-gray-400 mt-0.5">配置博客基本信息与社交媒体链接</p>
            </div>
        </div>

        <!-- 基本信息卡片 -->
        <el-card shadow="never" class="mb-5 rounded-xl">
            <template #header>
                <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
                        <el-icon :size="12" color="#409EFF"><Setting /></el-icon>
                    </div>
                    <span class="text-sm font-semibold text-gray-700">基本信息</span>
                </div>
            </template>

            <div class="flex gap-8 items-start">
                <!-- 头像上传区域 -->
                <div class="flex flex-col items-center gap-2 flex-shrink-0">
                    <el-upload action="#" :on-change="handleTitleImageChange" :auto-upload="false" :show-file-list="false">
                        <div class="relative group cursor-pointer">
                            <img v-if="form.avatar" :src="form.avatar"
                                class="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100 shadow" />
                            <div v-else
                                class="w-24 h-24 rounded-full bg-gray-100 ring-4 ring-gray-200 flex flex-col items-center justify-center shadow">
                                <el-icon :size="28" color="#c0c4cc"><Plus /></el-icon>
                                <span class="text-xs text-gray-400 mt-1">上传头像</span>
                            </div>
                            <!-- hover 遮罩 -->
                            <div v-if="form.avatar"
                                class="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                                <el-icon :size="22" color="white"><Edit /></el-icon>
                            </div>
                        </div>
                    </el-upload>
                    <span class="text-xs text-gray-400">点击更换头像</span>
                </div>

                <!-- 表单字段 -->
                <div class="flex-1 min-w-0">
                    <el-form :model="form" label-width="90px" :rules="rules" ref="formRef">
                        <el-form-item label="博客名称" prop="blogName">
                            <el-input v-model="form.blogName" clearable placeholder="请输入博客名称" />
                        </el-form-item>
                        <el-form-item label="作者名" prop="author">
                            <el-input v-model="form.author" clearable placeholder="请输入作者名称" />
                        </el-form-item>
                        <el-form-item label="个人介绍">
                            <el-input v-model="form.introduction" type="textarea" :rows="3"
                                placeholder="介绍一下自己吧~" maxlength="200" show-word-limit />
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>

        <!-- 社交链接卡片 -->
        <el-card shadow="never" class="mb-6 rounded-xl">
            <template #header>
                <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                        <el-icon :size="12" color="#67C23A"><Link /></el-icon>
                    </div>
                    <span class="text-sm font-semibold text-gray-700">社交链接</span>
                </div>
            </template>

            <div class="space-y-3">
                <!-- GitHub -->
                <div class="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                    <div class="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <span class="text-white text-sm font-bold">G</span>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <div>
                                <span class="text-sm font-medium text-gray-800">GitHub</span>
                                <span class="text-xs text-gray-400 ml-2">代码托管平台</span>
                            </div>
                            <el-switch v-model="isGithubCheck" inline-prompt
                                :active-icon="Check" :inactive-icon="Close"
                                @change="githubSwitchChange" />
                        </div>
                        <el-input v-if="isGithubCheck" v-model="form.githubHome" clearable
                            placeholder="https://github.com/username" size="small">
                            <template #prefix>
                                <el-icon color="#aaa"><Link /></el-icon>
                            </template>
                        </el-input>
                    </div>
                </div>

                <!-- CSDN -->
                <div class="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-colors">
                    <div class="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <span class="text-white text-sm font-bold">C</span>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <div>
                                <span class="text-sm font-medium text-gray-800">CSDN</span>
                                <span class="text-xs text-gray-400 ml-2">技术博客社区</span>
                            </div>
                            <el-switch v-model="isCSDNCheck" inline-prompt
                                :active-icon="Check" :inactive-icon="Close"
                                @change="csdnSwitchChange" />
                        </div>
                        <el-input v-if="isCSDNCheck" v-model="form.csdnHome" clearable
                            placeholder="https://blog.csdn.net/username" size="small">
                            <template #prefix>
                                <el-icon color="#aaa"><Link /></el-icon>
                            </template>
                        </el-input>
                    </div>
                </div>
            </div>
        </el-card>

        <!-- 保存按钮 -->
        <div class="flex justify-end gap-3">
            <el-button @click="initBlogSetting">重置</el-button>
            <el-button type="primary" :loading="saving" @click="onSubmit" class="px-8">
                <el-icon class="mr-1"><Check /></el-icon>
                保存设置
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Check, Close, Plus, Edit, Setting, Link } from '@element-plus/icons-vue'
import { uploadFile } from '@/api/admin/file'
import { showMessage } from '@/composables/util'
import { getBlogSettingDetail, updateBlogSetting } from '@/api/admin/blogsetting'

const isGithubCheck = ref(false)
const isCSDNCheck = ref(false)
const saving = ref(false)
const formRef = ref(null)


const form = reactive({
    blogName: '',
    author: '',
    avatar: '',
    introduction: '',
    githubHome: '',
    giteeHome: '',
    csdnHome: '',
    zhihuHome: '',
})

const rules = {
    blogName: [{ required: true, message: '请输入博客名称', trigger: 'blur' }],
    author: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
    avatar: [{ required: true, message: '请选择作者头像', trigger: 'blur' }],
}

const githubSwitchChange = (e) => {
    if (e == false) {
        form.githubHome = ''
    }
}

const csdnSwitchChange = (e) => {
    if (e == false) {
        form.csdnHome = ''
    }
}



const handleTitleImageChange = (file) => {
    console.log('开始上传文件')
    console.log(file)
    let formData = new FormData()
    formData.append("file", file.raw);
    uploadFile(formData).then((e) => {
        if (e.success == false) {
            let message = e.message
            showMessage(message, 'error', 'message')
            return
        }
        form.avatar = e.data.url
        showMessage('头像上传成功', 'success', 'message')
    })
}

function initBlogSetting() {
    getBlogSettingDetail().then((e) => {
        if (e.success == true) {
            form.blogName = e.data.blogName
            form.author = e.data.author
            form.avatar = e.data.avatar
            form.introduction = e.data.introduction
            if (e.data.githubHome) {
                isGithubCheck.value = true
                form.githubHome = e.data.githubHome
            }
            if (e.data.csdnHome) {
                isCSDNCheck.value = true
                form.csdnHome = e.data.csdnHome
            }
        }
})
}
initBlogSetting()


const onSubmit = () => {
    saving.value = true
    updateBlogSetting(form).then((e) => {
        if (e.success == false) {
            showMessage(e.message, 'warning', 'message')
            return
        }
        showMessage('保存成功', 'success', 'message')
        initBlogSetting()
    }).finally(() => {
        saving.value = false
    })
}
</script>