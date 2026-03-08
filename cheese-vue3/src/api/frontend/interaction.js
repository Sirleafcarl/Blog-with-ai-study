import axios from "@/axios"

export function toggleArticleLike(articleId) {
    return axios.post("/article/interaction/like", { articleId })
}

export function toggleArticleFavorite(articleId) {
    return axios.post("/article/interaction/favorite", { articleId })
}

export function getInteractionStatus(articleId) {
    return axios.post("/article/interaction/status", { articleId })
}

export function getMyLikedArticles(current, size) {
    return axios.post("/article/interaction/my-likes", { current, size })
}

export function getMyFavoritedArticles(current, size) {
    return axios.post("/article/interaction/my-favorites", { current, size })
}
