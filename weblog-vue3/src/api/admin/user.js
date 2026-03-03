import axios from "@/axios"

export function login(username, password) {
    return axios.post("/login", {username, password})
}

export function register(username, password, email) {
    return axios.post("/admin/register", {username, password, email})
}

export function getAdminInfo() {
    return axios.post("/admin/detail")
}

export function updateAdminPassword(data) {
    return axios.post("/admin/password/update", data)
}

export function getUserPageList(data) {
    return axios.post("/admin/user/list", data)
}

export function updateUserStatus(data) {
    return axios.post("/admin/user/updateStatus", data)
}
