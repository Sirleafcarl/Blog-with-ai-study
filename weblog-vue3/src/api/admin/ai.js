import axios from '@/axios'

// AI 根据笔记生成题目
export function generateQuestions(noteId) {
    return axios.post('/user/ai/generate-questions', { noteId })
}

// AI 批改笔记
export function reviewNote(noteId) {
    return axios.post('/user/ai/review-note', { noteId })
}

// 查询 AI 历史记录
export function getAiHistory(current, size) {
    return axios.post('/user/ai/history', { current, size })
}

// 更新历史答题得分
export function updateAiHistoryScore(historyId, score) {
    return axios.post('/user/ai/history/score', { historyId, score })
}
