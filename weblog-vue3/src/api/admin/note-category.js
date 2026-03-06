import axios from "@/axios"

// 新增笔记分类
export function addNoteCategory(data) {
    return axios.post("/user/note-category/add", data)
}

// 删除笔记分类
export function deleteNoteCategory(id) {
    return axios.post("/user/note-category/delete", { id })
}

// 获取笔记分类列表
export function getNoteCategoryList() {
    return axios.post("/user/note-category/list")
}
