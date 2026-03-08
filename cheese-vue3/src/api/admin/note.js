import axios from "@/axios"

export function createNote(data) {
    return axios.post("/user/note/add", data)
}

export function updateNote(data) {
    return axios.post("/user/note/update", data)
}

export function deleteNote(id) {
    return axios.post("/user/note/delete", { id })
}

export function getNoteDetail(id) {
    return axios.post("/user/note/detail", { id })
}

export function getNotePageList(data) {
    return axios.post("/user/note/list", data)
}
