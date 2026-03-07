<template>
    <Header></Header>

    <div class="container mx-auto max-w-screen-xl mt-8 mb-12">
        <div class="grid grid-cols-4 gap-0">
            <!-- 左边主内容 -->
            <div class="col-span-4 px-4 md:col-span-3">
                <!-- 页面标题 -->
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-1 h-7 bg-blue-500 rounded-full"></div>
                    <div>
                        <h1 class="text-xl font-bold text-gray-800">全部分类</h1>
                        <p class="text-xs text-gray-400 mt-0.5">共 {{ categories.length }} 个分类</p>
                    </div>
                </div>

                <!-- 分类卡片网格 -->
                <div v-if="categories.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div
                        v-for="(item, index) in categories"
                        :key="index"
                        @click="goCatagoryArticleListPage(item.id, item.name)"
                        class="group cursor-pointer bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <!-- 图标区域 -->
                        <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                            :class="colorClasses[index % colorClasses.length].bg">
                            <svg class="w-5 h-5" :class="colorClasses[index % colorClasses.length].icon"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5" />
                            </svg>
                        </div>
                        <!-- 分类名 -->
                        <p class="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors truncate">
                            {{ item.name }}
                        </p>
                        <!-- 箭头 -->
                        <div class="flex items-center gap-1 mt-2">
                            <span class="text-xs text-gray-400 group-hover:text-blue-500 transition-colors">查看文章</span>
                            <svg class="w-3 h-3 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- 空状态 -->
                <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400">
                    <svg class="w-16 h-16 mb-4 opacity-40" fill="none" viewBox="0 0 64 64">
                        <rect x="8" y="16" width="48" height="36" rx="4" stroke="currentColor" stroke-width="2"/>
                        <path stroke="currentColor" stroke-width="2" d="M8 24h48M20 16v-4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4"/>
                    </svg>
                    <p class="text-sm">暂无分类</p>
                </div>
            </div>

            <!-- 右边栏 -->
            <div class="col-span-4 px-4 md:col-span-1 mt-4 md:mt-0">
                <UserInfoCard></UserInfoCard>
            </div>
        </div>
    </div>

    <Footer></Footer>
</template>

<script setup>
import Header from '@/layouts/components/Header.vue'
import Footer from '@/layouts/components/Footer.vue'
import UserInfoCard from '@/components/UserInfoCard.vue'
import { useRouter } from 'vue-router'
import { getCategories } from '@/api/frontend/category'
import { ref } from 'vue'

const router = useRouter()

const colorClasses = [
    { bg: 'bg-blue-50',   icon: 'text-blue-500' },
    { bg: 'bg-green-50',  icon: 'text-green-500' },
    { bg: 'bg-purple-50', icon: 'text-purple-500' },
    { bg: 'bg-orange-50', icon: 'text-orange-500' },
    { bg: 'bg-pink-50',   icon: 'text-pink-500' },
    { bg: 'bg-teal-50',   icon: 'text-teal-500' },
    { bg: 'bg-indigo-50', icon: 'text-indigo-500' },
    { bg: 'bg-red-50',    icon: 'text-red-500' },
]

const goCatagoryArticleListPage = (id, name) => {
    router.push({ path: '/category/list', query: { id: id, name: name } })
}

const categories = ref([])
getCategories().then((e) => {
    if (e.success) {
        categories.value = e.data || []
    }
})
</script>
