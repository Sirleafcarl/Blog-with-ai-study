<template>
    <div>
        <!-- 搜索栏 -->
        <div class="flex items-center mb-4 gap-3">
            <el-input
                v-model="searchUsername"
                placeholder="搜索用户名"
                clearable
                class="w-64"
                @keyup.enter="loadData"
            />
            <el-button type="primary" @click="loadData">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
        </div>

        <!-- 用户表格 -->
        <el-table :data="tableData" v-loading="loading" stripe border>
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column label="头像" width="80">
                <template #default="{ row }">
                    <el-avatar :src="row.avatar" :size="36">
                        {{ row.username?.charAt(0)?.toUpperCase() }}
                    </el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" min-width="120" />
            <el-table-column prop="nickname" label="昵称" min-width="120">
                <template #default="{ row }">
                    {{ row.nickname || '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="160">
                <template #default="{ row }">
                    {{ row.email || '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="注册时间" width="160" />
            <el-table-column label="状态" width="100">
                <template #default="{ row }">
                    <el-tag :type="row.isDisabled ? 'danger' : 'success'" size="small">
                        {{ row.isDisabled ? '已禁用' : '正常' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
                <template #default="{ row }">
                    <el-button
                        v-if="!row.isDisabled"
                        type="danger"
                        size="small"
                        @click="handleToggleStatus(row)"
                    >禁用</el-button>
                    <el-button
                        v-else
                        type="success"
                        size="small"
                        @click="handleToggleStatus(row)"
                    >启用</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="flex justify-end mt-4">
            <el-pagination
                v-model:current-page="current"
                v-model:page-size="size"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="loadData"
                @current-change="loadData"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserPageList, updateUserStatus } from '@/api/admin/user.js'

const searchUsername = ref('')
const loading = ref(false)
const tableData = ref([])
const current = ref(1)
const size = ref(10)
const total = ref(0)

const loadData = async () => {
    loading.value = true
    try {
        const res = await getUserPageList({
            current: current.value,
            size: size.value,
            searchUsername: searchUsername.value || null
        })
        if (res.success) {
            tableData.value = res.data
            total.value = res.total
        } else {
            ElMessage.error(res.message || '获取用户列表失败')
        }
    } catch (e) {
        ElMessage.error('请求失败')
    } finally {
        loading.value = false
    }
}

const resetSearch = () => {
    searchUsername.value = ''
    current.value = 1
    loadData()
}

const handleToggleStatus = async (row) => {
    const action = row.isDisabled ? '启用' : '禁用'
    try {
        await ElMessageBox.confirm(
            `确定要${action}用户「${row.username}」吗？`,
            '确认操作',
            { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
        )
        const res = await updateUserStatus({ userId: row.id, isDisabled: !row.isDisabled })
        if (res.success) {
            ElMessage.success(`${action}成功`)
            row.isDisabled = !row.isDisabled
        } else {
            ElMessage.error(res.message || `${action}失败`)
        }
    } catch (e) {
        // 取消操作
    }
}

onMounted(() => {
    loadData()
})
</script>
