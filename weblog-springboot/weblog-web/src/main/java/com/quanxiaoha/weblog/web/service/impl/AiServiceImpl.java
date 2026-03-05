package com.quanxiaoha.weblog.web.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.NoteDO;
import com.quanxiaoha.weblog.web.dao.NoteDao;
import com.quanxiaoha.weblog.web.model.vo.ai.AiNoteReqVO;
import com.quanxiaoha.weblog.web.service.AiService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
@Slf4j
public class AiServiceImpl implements AiService {

    private static final String DASHSCOPE_URL =
            "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

    @Value("${dashscope.api-key}")
    private String apiKey;

    @Value("${dashscope.model:qwen-turbo}")
    private String model;

    @Autowired
    private NoteDao noteDao;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    private String currentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    @Override
    public Response generateQuestions(AiNoteReqVO reqVO) {
        String username = currentUsername();
        NoteDO noteDO = noteDao.queryById(reqVO.getNoteId(), username);
        if (noteDO == null) {
            return Response.fail("笔记不存在或无权访问");
        }

        String content = noteDO.getContent() == null ? "" : noteDO.getContent();
        if (content.trim().isEmpty()) {
            return Response.fail("笔记内容为空，无法生成题目");
        }

        String prompt = "你是一位出题老师。请根据以下笔记内容，生成5道单选题。\n"
                + "每道题格式如下：\n"
                + "【第N题】题目内容\n"
                + "A. 选项A\n"
                + "B. 选项B\n"
                + "C. 选项C\n"
                + "D. 选项D\n"
                + "【正确答案】X\n"
                + "【解析】简要说明\n\n"
                + "笔记标题：" + noteDO.getTitle() + "\n\n"
                + "笔记内容：\n" + content;

        String result = callAi(prompt);
        if (result == null) {
            return Response.fail("AI 服务调用失败，请检查 API Key 配置或稍后重试");
        }
        return Response.success(result);
    }

    @Override
    public Response reviewNote(AiNoteReqVO reqVO) {
        String username = currentUsername();
        NoteDO noteDO = noteDao.queryById(reqVO.getNoteId(), username);
        if (noteDO == null) {
            return Response.fail("笔记不存在或无权访问");
        }

        String content = noteDO.getContent() == null ? "" : noteDO.getContent();
        if (content.trim().isEmpty()) {
            return Response.fail("笔记内容为空，无法批改");
        }

        String prompt = "你是一位认真负责的老师。请对以下学生笔记进行评分和点评。\n"
                + "请按照以下格式输出：\n"
                + "【综合评分】XX / 100分\n"
                + "【知识完整性】评价内容\n"
                + "【逻辑清晰度】评价内容\n"
                + "【表达准确性】评价内容\n"
                + "【总体点评】详细点评内容\n"
                + "【改进建议】具体的改进建议\n\n"
                + "笔记标题：" + noteDO.getTitle() + "\n\n"
                + "笔记内容：\n" + content;

        String result = callAi(prompt);
        if (result == null) {
            return Response.fail("AI 服务调用失败，请检查 API Key 配置或稍后重试");
        }
        return Response.success(result);
    }

    /**
     * 调用 DashScope OpenAI 兼容接口
     */
    private String callAi(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            headers.set("Authorization", "Bearer " + apiKey);

            // 用 ObjectMapper 序列化 prompt，避免特殊字符转义问题
            String promptJson = objectMapper.writeValueAsString(prompt);
            String requestBody = "{\"model\":\"" + model + "\","
                    + "\"messages\":[{\"role\":\"user\",\"content\":" + promptJson + "}],"
                    + "\"max_tokens\":2000}";

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            log.info("==> 调用 DashScope AI, model: {}", model);

            log.info("==> 请求 URL: {}", DASHSCOPE_URL);
            log.info("==> 请求 Body: {}", requestBody);

            ResponseEntity<String> response = restTemplate.postForEntity(DASHSCOPE_URL, entity, String.class);

            log.info("==> AI 响应状态: {}", response.getStatusCode());
            log.info("==> AI 响应 Body: {}", response.getBody());

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode root = objectMapper.readTree(response.getBody());
                String result = root.path("choices").get(0).path("message").path("content").asText();
                log.info("==> AI 调用成功, 返回内容长度: {}", result.length());
                return result;
            }
            log.warn("==> AI 调用返回非 2xx 状态: {}, body: {}", response.getStatusCode(), response.getBody());
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            log.error("==> AI 调用 HTTP 错误: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("==> AI 调用异常: {} - {}", e.getClass().getSimpleName(), e.getMessage(), e);
        }
        return null;
    }
}
