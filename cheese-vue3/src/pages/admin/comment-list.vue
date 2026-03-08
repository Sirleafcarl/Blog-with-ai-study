<template>
    <el-card shadow="never" :body-style="{ padding: '20px' }" class="mb-5 border-1">
        <el-text class="mx-1 mr-3">昵称</el-text>
        <el-input v-model="searchNickname" placeholder="请输入昵称（模糊查询）" class="w-50 mr-5" clearable />
        <el-button type="primary" class="ml-3" :icon="Search" @click="getTableData">查询</el-button>
        <el-button class="ml-3" :icon="RefreshRight" @click="reset">重置</el-button>
    </el-card>

    <el-card shadow="never" class="border-1">
        <el-table :data="tableData" stripe style="width: 100%" class="mt-2" v-loading="tableLoading">
            <el-table-column prop="id" label="ID" width="70" />
            <el-table-column prop="articleTitle" label="所属文章" width="200" show-overflow-tooltip />
            <el-table-column prop="nickname" label="昵称" width="120" />
            <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip />
            <el-table-column prop="content" label="评论内容" show-overflow-tooltip />
            <el-table-column prop="createTime" label="评论时间" width="160" />
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">
                        <el-icon class="mr-1"><Delete /></el-icon>
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="mt-5 flex item-center justify-center">
            <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 20, 50]"
                background layout="total, sizes, prev, pager, next, jumper"
                :total="total" @size-change="handleSizeChange" @current-change="getTableData" />
        </div>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { Search, RefreshRight, Delete } from '@element-plus/icons-vue'
import { getAdminCommentPageList, deleteAdminComment } from '@/api/admin/comment'
import { showMessage } from '@/composables/util'
import { ElMessageBox, ElMessage } from 'element-plus'

const searchNickname = ref('')
const tableLoading = ref(false)
const tableData = ref([])
const current = ref(1)
const total = ref(0)
const size = ref(10)

const reset = () => {
    searchNickname.value = ''
    current.value = 1
    getTableData()
}

function getTableData() {
    tableLoading.value = true
    getAdminCommentPageList({ current: current.value, size: size.value, nickname: searchNickname.value || null })
        .then(res => {
            if (res.success) {
                tableData.value = res.data || []
                total.value = res.total || 0
            }
        }).finally(() => { tableLoading.value = false })
}
getTableData()

const handleSizeChange = (val) => {
    size.value = val
    getTableData()
}

const handleDelete = (row) => {
    ElMessageBox.confirm('确定要删除这条评论吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        deleteAdminComment(row.id).then(res => {
            if (res.success) {
                showMessage('删除成功', 'success')
                getTableData()
            } else {
                showMessage(res.message || '删除失败', 'warning')
            }
        })
    }).catch(() => {
        ElMessage({ type: 'info', message: '已取消' })
    })
}
</script>
