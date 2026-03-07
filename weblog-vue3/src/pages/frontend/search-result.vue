<template>
    <Header></Header>

    <!-- 搜索英雄区 -->
    <div class="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-gray-100">
        <div class="container mx-auto max-w-screen-xl px-4 py-10">
            <!-- 搜索框 -->
            <div class="flex justify-center mb-6">
                <div class="relative w-full max-w-2xl">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        v-model="inputKeyword"
                        @keyup.enter="handleSearch"
                        type="text"
                        placeholder="输入关键词，按回车搜索..."
                        class="w-full pl-12 pr-14 py-3.5 rounded-2xl border border-blue-200 bg-white shadow-sm text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
                    />
                    <button @click="handleSearch"
                        class="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 text-sm font-medium transition">
                        搜索
                    </button>
                </div>
            </div>
            <!-- 搜索结果摘要 -->
            <div class="text-center">
                <p v-if="keyword" class="text-gray-500 text-sm">
                    <span v-if="total > 0">找到 <strong class="text-blue-600">{{ total }}</strong> 篇与「<strong class="text-gray-700">{{ keyword }}</strong>」相关的文章</span>
                    <span v-else>未找到与「<strong class="text-gray-700">{{ keyword }}</strong>」相关的文章</span>
                </p>
            </div>
        </div>
    </div>

    <div class="container mx-auto max-w-screen-xl px-4 py-8">
        <!-- 文章列表 -->
        <div v-if="articles && articles.length > 0" class="space-y-4">
            <div v-for="(article, index) in articles" :key="index"
                @click="goArticleDetail(article.id)"
                class="group flex gap-5 bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all duration-200">
                <!-- 封面图 -->
                <div class="flex-shrink-0 w-40 h-28 rounded-xl overflow-hidden bg-gray-100">
                    <img v-if="article.titleImage" :src="article.titleImage"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        :alt="article.title" />
                    <div v-else class="w-full h-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="1.5" d="M4 16l4-4 4 4 4-6 4 6H4z"/>
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                    </div>
                </div>
                <!-- 文字信息 -->
                <div class="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                        <h2 class="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1.5">
                            {{ article.title }}
                        </h2>
                        <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">{{ article.description }}</p>
                    </div>
                    <div class="flex items-center gap-3 mt-2 flex-wrap">
                        <span class="flex items-center gap-1 text-xs text-gray-400">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
                            </svg>
                            {{ article.createTime }}
                        </span>
                        <span v-for="(tag, idx) in article.tags" :key="idx"
                            class="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                            # {{ tag.name }}
                        </span>
                    </div>
                </div>
                <!-- 箭头 -->
                <div class="flex-shrink-0 self-center">
                    <svg class="w-4 h-4 text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all"
                        fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"/>
                    </svg>
                </div>
            </div>
        </div>

        <!-- 无结果 -->
        <div v-else-if="keyword && !loading" class="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg class="w-20 h-20 mb-5 opacity-30" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <p class="text-base font-medium mb-1">没有找到相关结果</p>
            <p class="text-sm">试试其他关键词？</p>
        </div>

        <!-- 分页 -->
        <div v-if="total > 0" class="flex justify-center mt-10">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="size"
                v-model:current-page="current"
                @current-change="getArticles"
            />
        </div>
    </div>

    <Footer></Footer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/layouts/components/Header.vue'
import Footer from '@/layouts/components/Footer.vue'
import { searchArticle } from '@/api/frontend/search'

const route = useRoute()
const router = useRouter()

const keyword = ref(route.query.keyword || '')
const inputKeyword = ref(route.query.keyword || '')
const articles = ref([])
const current = ref(1)
const total = ref(0)
const size = 10
const loading = ref(false)

const getArticles = (page = 1) => {
    current.value = page
    if (!keyword.value.trim()) return
    loading.value = true
    searchArticle({ keyword: keyword.value, current: page, size }).then((res) => {
        if (res.success) {
            articles.value = res.data || []
            total.value = res.total || 0
            current.value = res.current || 1
        }
    }).finally(() => {
        loading.value = false
    })
}

const handleSearch = () => {
    const kw = inputKeyword.value.trim()
    if (!kw) return
    router.push({ path: '/search', query: { keyword: kw } })
}

const goArticleDetail = (id) => {
    router.push({ path: '/article/detail', query: { articleId: id } })
}

onMounted(() => {
    getArticles(1)
})

watch(() => route.query.keyword, (val) => {
    keyword.value = val || ''
    inputKeyword.value = val || ''
    current.value = 1
    getArticles(1)
})
</script>
