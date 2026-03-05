import axios from '@/axios'

// AI 根据笔记生成题目
export function generateQuestions(noteId) {
    return axios.post('/user/ai/generate-questions', { noteId })
}

// AI 批改笔记
export function reviewNote(noteId) {
    return axios.post('/user/ai/review-note', { noteId })
}
