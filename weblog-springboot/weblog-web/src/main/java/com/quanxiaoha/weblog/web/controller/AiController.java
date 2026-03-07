package com.quanxiaoha.weblog.web.controller;

import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.aspect.ApiOperationLog;
import com.quanxiaoha.weblog.web.model.vo.ai.AiNoteReqVO;
import com.quanxiaoha.weblog.web.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @PostMapping("/history")
    @ApiOperationLog(description = "查询 AI 历史记录")
    public Response getAiHistory(@RequestBody Map<String, Integer> body) {
        int current = body.getOrDefault("current", 1);
        int size = body.getOrDefault("size", 10);
        return aiService.getAiHistory(current, size);
    }

    @PostMapping("/history/score")
    @ApiOperationLog(description = "更新 AI 历史答题得分")
    public Response updateHistoryScore(@RequestBody Map<String, Object> body) {
        Long historyId = Long.valueOf(body.get("historyId").toString());
        Integer score = Integer.valueOf(body.get("score").toString());
        return aiService.updateHistoryScore(historyId, score);
    }

    @PostMapping("/generate-article")
    @ApiOperationLog(description = "AI 根据题目生成文章内容")
    public Response generateArticleContent(@RequestBody Map<String, String> body) {
        String topic = body.getOrDefault("topic", "");
        return aiService.generateArticleContent(topic);
    }

    @PostMapping("/polish-article")
    @ApiOperationLog(description = "AI 润色/纠错/优化文章内容")
    public Response polishArticle(@RequestBody Map<String, String> body) {
        String content = body.getOrDefault("content", "");
        String mode = body.getOrDefault("mode", "polish");
        return aiService.polishArticle(content, mode);
    }
}
