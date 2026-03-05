package com.quanxiaoha.weblog.web.service;

import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.web.model.vo.ai.AiNoteReqVO;

public interface AiService {

    /** 根据笔记内容生成选择题 */
    Response generateQuestions(AiNoteReqVO reqVO);

    /** AI 批改/点评笔记 */
    Response reviewNote(AiNoteReqVO reqVO);
}
