<template>
    <Header></Header>

    <div class="container mx-auto max-w-screen-xl mt-8 mb-12">
        <div class="grid grid-cols-4 gap-0">
            <!-- 左边主内容 -->
            <div class="col-span-4 px-4 md:col-span-3">
                <!-- 页面标题 -->
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-1 h-7 bg-purple-500 rounded-full"></div>
                    <div>
                        <h1 class="text-xl font-bold text-gray-800">文章归档</h1>
                        <p class="text-xs text-gray-400 mt-0.5">共 {{ total }} 篇文章</p>
                    </div>
                </div>

                <!-- 时间线 -->
                <div v-if="archives.length > 0" class="relative">
                    <!-- 竖线 -->
                    <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100 md:left-6"></div>

                    <div v-for="(group, gi) in archives" :key="gi" class="mb-8">
                        <!-- 月份标题 -->
                        <div class="flex items-center gap-3 mb-4 relative">
                            <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 z-10 shadow-sm md:w-12 md:h-12">
                                <svg class="w-4 h-4 text-white md:w-5 md:h-5" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
                                </svg>
                            </div>
                            <div>
                                <span class="text-base font-bold text-gray-800 md:text-lg">{{ group.month }}</span>
                                <span class="ml-2 text-xs text-gray-400">{{ group.articles.length }} 篇</span>
                            </div>
                        </div>

                        <!-- 文章列表 -->
                        <div class="ml-11 space-y-3 md:ml-16">
                            <div
                                v-for="(article, ai) in group.articles"
                                :key="ai"
                                @click="goArticleDetail(article.id)"
                                class="group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-3 cursor-pointer hover:border-purple-200 hover:shadow-sm transition-all duration-200"
                            >
                                <!-- 封面图 -->
                                <div class="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden bg-gray-100 md:w-24 md:h-16">
                                    <img v-if="article.titleImage" :src="article.titleImage"
                                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        :alt="article.title" />
                                    <div v-else class="w-full h-full flex items-center justify-center">
                                        <svg class="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-width="1.5" d="M4 16l4-4 4 4 4-6 4 6H4z"/>
                                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                </div>
                                <!-- 文章信息 -->
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">
                                        {{ article.title }}
                                    </p>
                                    <div class="flex items-center gap-1 mt-1">
                                        <svg class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
                                        </svg>
                                        <span class="text-xs text-gray-400">{{ article.createTime }}</span>
                                    </div>
                                </div>
                                <!-- 箭头 -->
                                <svg class="w-4 h-4 text-gray-300 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                                    fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 空状态 -->
                <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400">
                    <svg class="w-16 h-16 mb-4 opacity-40" fill="none" viewBox="0 0 64 64">
                        <rect x="8" y="12" width="48" height="44" rx="4" stroke="currentColor" stroke-width="2"/>
                        <path stroke="currentColor" stroke-width="2" d="M20 8v8M44 8v8M8 28h48"/>
                    </svg>
                    <p class="text-sm">暂无归档文章</p>
                </div>

                <!-- 分页 -->
                <div v-if="total > 0" class="flex justify-center mt-8">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="size"
                        v-model:current-page="current"
                        @current-change="getArchiveList"
                    />
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
import { getArchives } from '@/api/frontend/archive'
import { ref } from 'vue'

const router = useRouter()

const goArticleDetail = (articleId) => {
    router.push({ path: '/article/detail', query: { articleId: articleId } })
}

const archives = ref([])
const current = ref(1)
const total = ref(0)
const size = ref(10)

function getArchiveList(currentPage) {
    getArchives({ current: currentPage, size: size.value }).then((res) => {
        if (res.success == true) {
            archives.value = res.data
            current.value = res.current
            total.value = res.total
            size.value = res.size
        }
    })
}
getArchiveList(current.value)
</script>
