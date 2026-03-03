import router from '@/router/index'
import { getToken } from '@/composables/auth'
import { notification, showMessage } from '@/composables/util'
import store from '@/store'
import { showPageLoading, hidePageLoading } from '@/composables/util'


// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    console.log('全局前置守卫 >>>>')
    showPageLoading()
    // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    // else next()

    

    const token = getToken()

    // 如果用户已登录，则自动获取用户信息，并使用全局状态管理
    if (token) {
        console.log('获取登录用户信息。。。。')
        try {
            await store.dispatch('getAdminInfo')
        } catch (e) {
            console.log('获取用户信息失败', e)
        }
    }

    // 前台请求逻辑处理
    if (!to.path.startsWith('/admin')) {
        await store.dispatch('getBlogSetting')

        // /profile 需要登录
        if (to.path === '/profile' && !token) {
            showMessage('请先登录', 'warning')
            next({ path: '/login' })
            return
        }

        next()
        return
    }


    // 后台请求逻辑处理
    // 未登录，强制跳转登录页
    if (!token && to.path.startsWith('/admin')) {
        showMessage('请先登录', 'warning')
        next({ path: '/login'})
        return
    }

    // 已登录但非管理员，禁止访问后台
    if (token && to.path.startsWith('/admin')) {
        const roles = store.state.user.roles
        const isAdmin = Array.isArray(roles) && roles.includes('ROLE_ADMIN')
        if (!isAdmin) {
            next({ path: '/' })
            return
        }
    }

    next()
})

router.afterEach((to, from) => {
    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : '') + ' - WeBlog'
    document.title = title

    hidePageLoading()
})
