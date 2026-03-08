package com.sirleaf.cheese.web.service;

import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.web.model.vo.ai.AiNoteReqVO;

public interface AiService {

    /** 根据笔记内容生成选择题 */
    Response generateQuestions(AiNoteReqVO reqVO);

    /** AI 批改/点评笔记 */
    Response reviewNote(AiNoteReqVO reqVO);

    /** 查询 AI 历史记录列表 */
    Response getAiHistory(int current, int size);

    /** 更新历史记录的答题得分 */
    Response updateHistoryScore(Long historyId, Integer score);

    /** 根据题目生成博客文章内容（Markdown） */
    Response generateArticleContent(String topic);

    /** AI 润色 / 纠错 / 优化文章内容 */
    Response polishArticle(String content, String mode);
}
