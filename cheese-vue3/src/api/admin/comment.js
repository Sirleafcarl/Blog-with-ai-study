import axios from "@/axios"

export function getAdminCommentPageList(data) {
    return axios.post("/admin/comment/list", data)
}

export function deleteAdminComment(id) {
    return axios.post("/admin/comment/delete", { id })
}
