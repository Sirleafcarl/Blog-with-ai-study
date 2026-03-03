import axios from "@/axios"

export function getUserProfile() {
    return axios.post("/user/profile")
}

export function updateUserProfile(data) {
    return axios.post("/user/profile/update", data)
}

export function updateUserPassword(data) {
    return axios.post("/user/password/update", data)
}

export function uploadAvatar(file) {
    const formData = new FormData()
    formData.append('file', file)
    return axios.post("/user/avatar/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
