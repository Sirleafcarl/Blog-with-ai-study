import axios from "@/axios"

export function postComment(data) {
    return axios.post("/comment/post", data)
}

export function getCommentPageList(data) {
    return axios.post("/comment/list", data)
}
