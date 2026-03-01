<template>
    <div>
        <div class="grid grid-cols-6 h-screen bg-white">
            <!-- 左边栏 -->
            <div class="col-span-6 md:col-span-3 sm:col-span-6">
                <div class="login-container-left flex justify-center items-center flex-col">
                    <div class="animate__animated animate__bounceInLeft items-center flex flex-col">
                        <h2 class="font-bold text-4xl mb-7 text-white">创建账号</h2>
                        <p class="text-white">加入我们的在线学习博客社区</p>
                        <p class="text-gray-300 text-sm mt-2">记录笔记·分享知识·获取反馈·持续成长</p>
                        <img src="@/assets/developer.png" class="login-image">
                    </div>
                </div>
            </div>
            <!-- 右边栏 -->
            <div class="col-span-6 px-3 md:col-span-3 sm:col-span-6">
                <div
                    class="login-container-right flex justify-center items-center flex-col animate__animated animate__bounceInRight animate__fast">
                    <h2 class="font-bold text-3xl text-gray-800 mt-5">新用户注册</h2>
                    <div class="flex items-center justify-center my-5 text-gray-400 space-x-2">
                        <span class="h-[1px] w-16 bg-gray-200"></span>
                        <span>填写信息快速注册</span>
                        <span class="h-[1px] w-16 bg-gray-200"></span>
                    </div>
                    <div>
                        <el-form ref="formRef" :rules="rules" :model="form" class="w-[300px]">
                            <el-form-item prop="username">
                                <el-input v-model="form.username" :prefix-icon="User" placeholder="请输入用户名" size="large" clearable/>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input v-model="form.password" type="password" autocomplete="off" :prefix-icon="Lock"
                                    placeholder="请输入密码（6-20位）" show-password size="large" clearable/>
                            </el-form-item>
                            <el-form-item prop="confirmPassword">
                                <el-input v-model="form.confirmPassword" type="password" autocomplete="off" :prefix-icon="Lock"
                                    placeholder="请确认密码" show-password size="large" clearable/>
                            </el-form-item>
                            <el-form-item prop="email">
                                <el-input v-model="form.email" :prefix-icon="Message" placeholder="请输入邮箱（可选）" size="large" clearable/>
                            </el-form-item>
                            <el-form-item>
                                <el-button round type="primary" @click="onSubmit" :loading="loading"
                                    class="w-[300px] login-btn mt-2" size="large">
                                    注 册
                                </el-button>
                            </el-form-item>
                            <div class="text-center">
                                <span class="text-gray-500 text-sm">已有账号？</span>
                                <el-link type="primary" @click="goToLogin" class="ml-1">返回登录</el-link>
                            </div>
                        </el-form>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { showMessage } from '@/composables/util'
import { useRouter } from 'vue-router'
import { User, Lock, Message } from '@element-plus/icons-vue'
import { register } from '@/api/admin/user'

const router = useRouter()

const form = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
})

// 自定义密码匹配验证器
const validatePasswordMatch = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入确认密码'))
    } else if (value !== form.password) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}

// 自定义用户名验证器
const validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('用户名不能为空'))
    } else if (value.length < 3 || value.length > 20) {
        callback(new Error('用户名长度应为3-20位'))
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
        callback(new Error('用户名只支持字母、数字、下划线'))
    } else {
        callback()
    }
}

// 自定义邮箱验证器
const validateEmail = (rule, value, callback) => {
    if (value === '') {
        callback() // 邮箱为可选项
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        callback(new Error('请输入正确的邮箱地址'))
    } else {
        callback()
    }
}

const rules = {
    username: [
        {
            validator: validateUsername,
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        },
        {
            min: 6,
            max: 20,
            message: '密码长度应为6-20位',
            trigger: 'blur'
        }
    ],
    confirmPassword: [
        {
            validator: validatePasswordMatch,
            trigger: 'blur'
        }
    ],
    email: [
        {
            validator: validateEmail,
            trigger: 'blur'
        }
    ]
}

const formRef = ref(null)
const loading = ref(false)

const onSubmit = () => {
    // 注册表单验证
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log('验证不通过')
            return false
        }
        loading.value = true
        
        // 调用后端注册接口
        register(form.username, form.password, form.email)
            .then(res => {
                if (res.success) {
                    showMessage('注册成功，请登录', 'success')
                    router.push('/admin/login')
                } else {
                    showMessage(res.message || '注册失败', 'error')
                }
            })
            .catch(err => {
                console.error('注册错误:', err)
                showMessage('注册失败，请重试', 'error')
            })
            .finally(() => {
                loading.value = false
            })
    })
}

function onKeyUp(e) {
    if (e.key == 'Enter') {
        onSubmit()
    }
}

const goToLogin = () => {
    router.push('/admin/login')
}

// 添加键盘监听
onMounted(() => {
    document.addEventListener('keyup', onKeyUp)
})

// 移除键盘监听
onBeforeUnmount(() => {
    document.removeEventListener('keyup', onKeyUp)
})

</script>

<style>
:deep([type='text']:focus) {
    border-color: transparent !important;
}

.login-container {
    height: 100vh;
    width: 100%;
    background-color: #fff;
}

.login-container-left {
    height: 100%;
    background: #001428;
    color: #fff;
}

.login-container-right {
    height: 100%;
    overflow-y: auto;
}

.login-image {
    height: 350px;
    margin-top: 20px;
}

.login-btn {}
</style>
