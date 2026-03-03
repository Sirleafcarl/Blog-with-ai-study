import axios from "@/axios"

export function submitUserArticle(data) {
    return axios.post("/user/article/submit", data)
}

export function updateUserArticle(data) {
    return axios.post("/user/article/update", data)
}

export function deleteUserArticle(articleId) {
    return axios.post("/user/article/delete", { articleId })
}

export function getMyArticleList(data) {
    return axios.post("/user/article/list", data)
}

export function getMyArticleDetail(articleId) {
    return axios.post("/user/article/detail", { articleId })
}
