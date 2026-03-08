import axios from "@/axios"

export function searchArticle(data) {
    return axios.post("/search/article/list", data)
}
