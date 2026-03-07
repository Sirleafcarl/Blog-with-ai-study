<template>
    <Header></Header>

    <div class="container mx-auto max-w-screen-xl mt-8 mb-12">
        <div class="grid grid-cols-4 gap-0">
            <!-- 左边主内容 -->
            <div class="col-span-4 px-4 md:col-span-3">
                <!-- 页面标题 -->
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-1 h-7 bg-green-500 rounded-full"></div>
                    <div>
                        <h1 class="text-xl font-bold text-gray-800">全部标签</h1>
                        <p class="text-xs text-gray-400 mt-0.5">共 {{ tags.length }} 个标签</p>
                    </div>
                </div>

                <!-- 标签云 -->
                <div v-if="tags.length > 0"
                    class="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                    <div class="flex flex-wrap gap-3">
                        <span
                            v-for="(item, index) in tags"
                            :key="index"
                            @click="goTagArticleListPage(item.id, item.name)"
                            class="group cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                            :class="tagColors[index % tagColors.length]"
                        >
                            <svg class="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7A.997.997 0 0 1 2 10V5a3 3 0 0 1 3-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clip-rule="evenodd"/>
                            </svg>
                            {{ item.name }}
                        </span>
                    </div>
                </div>

                <!-- 空状态 -->
                <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400">
                    <svg class="w-16 h-16 mb-4 opacity-40" fill="none" viewBox="0 0 64 64">
                        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M52 28L36 12H16a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h32a4 4 0 0 0 4-4V28z"/>
                        <circle cx="22" cy="22" r="3" fill="currentColor" opacity="0.5"/>
                    </svg>
                    <p class="text-sm">暂无标签</p>
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
import { getTags } from '@/api/frontend/tag'
import { ref } from 'vue'

const router = useRouter()

// 多种配色循环使用
const tagColors = [
    'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
    'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
    'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
    'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100',
    'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100',
    'bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100',
    'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100',
    'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
    'bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100',
    'bg-cyan-50 text-cyan-600 border-cyan-200 hover:bg-cyan-100',
]

const goTagArticleListPage = (id, name) => {
    router.push({ path: '/tag/list', query: { id: id, name: name } })
}

const tags = ref([])
getTags().then((e) => {
    if (e.success) {
        tags.value = e.data || []
    }
})
</script>
