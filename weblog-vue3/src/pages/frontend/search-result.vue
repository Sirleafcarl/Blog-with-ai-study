<template>
    <Header></Header>

    <div class="container mx-auto max-w-screen-xl mt-5">
        <div class="grid grid-cols-4">
            <div class="col-span-4 px-3 md:col-span-3 sm:col-span-4">
                <!-- 搜索标题 -->
                <div class="flex items-center mb-5 text-gray-600 font-bold text-2xl">
                    <svg class="w-6 h-6 mr-2 text-gray-600 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    搜索：<span class="text-blue-600 ml-1">{{ keyword }}</span>
                    <span class="text-sm font-normal text-gray-400 ml-3" v-if="total > 0">共 {{ total }} 篇</span>
                </div>

                <!-- 文章列表 -->
                <div v-if="articles && articles.length > 0"
                    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(article, index) in articles" :key="index"
                        class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <a @click="goArticleDetail(article.id)" class="cursor-pointer">
                            <img class="rounded-t-lg h-50 w-full" :src="article.titleImage" />
                        </a>
                        <div class="p-5">
                            <a @click="goArticleDetail(article.id)" class="cursor-pointer">
                                <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {{ article.title }}
                                </h2>
                            </a>
                            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{{ article.description }}</p>
                            <p class="text-xs text-gray-400 mb-2">{{ article.createTime }}</p>
                            <div>
                                <span v-for="(item, idx) in article.tags" :key="idx"
                                    class="inline-block bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                    {{ item.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 无结果 -->
                <div v-else class="flex flex-col items-center mt-10">
                    <svg class="w-24 h-24 text-gray-300" fill="none" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <p class="text-gray-500 mt-4 text-lg">未找到与「{{ keyword }}」相关的文章</p>
                </div>

                <!-- 分页 -->
                <nav aria-label="Page navigation" v-if="total > 0">
                    <ul class="flex items-center justify-center mt-10 mb-10 -space-x-px h-10 text-base">
                        <li>
                            <a @click="current > 1 && getArticles(current - 1)"
                                :class="current <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
                                class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                            </a>
                        </li>
                        <li v-for="page in pages" :key="page">
                            <a @click="getArticles(page)"
                                class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight border border-gray-300"
                                :class="page == current
                                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                                    : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'">
                                {{ page }}
                            </a>
                        </li>
                        <li>
                            <a @click="current < pages && getArticles(current + 1)"
                                :class="current >= pages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
                                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 1l4 4-4 4" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/layouts/components/Header.vue'
import { searchArticle } from '@/api/frontend/search'

const route = useRoute()
const router = useRouter()

const keyword = ref(route.query.keyword || '')
const articles = ref([])
const current = ref(1)
const total = ref(0)
const pages = ref(1)
const size = 10

const getArticles = (page = 1) => {
    current.value = page
    if (!keyword.value.trim()) return
    searchArticle({ keyword: keyword.value, current: page, size }).then((res) => {
        if (res.success) {
            articles.value = res.data || []
            total.value = res.total || 0
            pages.value = res.pages || 1
            current.value = res.current || 1
        }
    })
}

const goArticleDetail = (id) => {
    router.push({ path: '/article/detail', query: { articleId: id } })
}

// 首次加载
onMounted(() => {
    getArticles(1)
})

// 从 Header 搜索框再次搜索（URL keyword 变化）时刷新
watch(() => route.query.keyword, (val) => {
    keyword.value = val || ''
    current.value = 1
    getArticles(1)
})
</script>
