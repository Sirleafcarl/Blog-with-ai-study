import axios from '@/axios'

// AI 根据笔记生成题目
export function generateQuestions(data) {
    return axios.post('/user/ai/generate-questions', data)
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

// 根据题目生成文章内容（Markdown）
export function generateArticleContent(topic) {
    return axios.post('/user/ai/generate-article', { topic })
}

// AI 润色 / 纠错 / 优化文章内容
// mode: 'polish' | 'proofread' | 'optimize'
export function polishArticleContent(content, mode) {
    return axios.post('/user/ai/polish-article', { content, mode })
}
