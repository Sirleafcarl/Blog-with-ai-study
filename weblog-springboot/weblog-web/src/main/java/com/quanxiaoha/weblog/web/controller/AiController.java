package com.quanxiaoha.weblog.web.controller;

import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.aspect.ApiOperationLog;
import com.quanxiaoha.weblog.web.model.vo.ai.AiNoteReqVO;
import com.quanxiaoha.weblog.web.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/generate-questions")
    @ApiOperationLog(description = "AI 根据笔记生成题目")
    public Response generateQuestions(@Validated @RequestBody AiNoteReqVO reqVO) {
        return aiService.generateQuestions(reqVO);
    }

    @PostMapping("/review-note")
    @ApiOperationLog(description = "AI 批改笔记")
    public Response reviewNote(@Validated @RequestBody AiNoteReqVO reqVO) {
        return aiService.reviewNote(reqVO);
    }
}
