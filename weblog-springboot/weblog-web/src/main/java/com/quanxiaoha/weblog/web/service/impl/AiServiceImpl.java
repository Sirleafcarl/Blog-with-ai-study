package com.quanxiaoha.weblog.web.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.AiHistoryDO;
import com.quanxiaoha.weblog.common.domain.dos.NoteDO;
import com.quanxiaoha.weblog.common.domain.mapper.AiHistoryMapper;
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

import java.text.SimpleDateFormat;
import java.util.*;

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
    private AiHistoryMapper aiHistoryMapper;

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

        saveHistory(username, noteDO, "quiz", result);

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

        saveHistory(username, noteDO, "review", result);

        return Response.success(result);
    }

    @Override
    public Response getAiHistory(int current, int size) {
        String username = currentUsername();
        Page<AiHistoryDO> page = new Page<>(current, size);
        QueryWrapper<AiHistoryDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(AiHistoryDO::getUsername, username)
                .orderByDesc(AiHistoryDO::getCreateTime);
        IPage<AiHistoryDO> result = aiHistoryMapper.selectPage(page, wrapper);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<Map<String, Object>> items = new ArrayList<>();
        for (AiHistoryDO h : result.getRecords()) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("id", h.getId());
            item.put("noteId", h.getNoteId());
            item.put("noteTitle", h.getNoteTitle());
            item.put("type", h.getType());
            item.put("content", h.getContent());
            item.put("score", h.getScore());
            item.put("createTime", sdf.format(h.getCreateTime()));
            items.add(item);
        }

        Map<String, Object> pageResult = new LinkedHashMap<>();
        pageResult.put("records", items);
        pageResult.put("total", result.getTotal());
        pageResult.put("current", current);
        pageResult.put("size", size);

        return Response.success(pageResult);
    }

    @Override
    public Response updateHistoryScore(Long historyId, Integer score) {
        String username = currentUsername();
        UpdateWrapper<AiHistoryDO> wrapper = new UpdateWrapper<>();
        wrapper.lambda()
                .set(AiHistoryDO::getScore, score)
                .eq(AiHistoryDO::getId, historyId)
                .eq(AiHistoryDO::getUsername, username);
        int rows = aiHistoryMapper.update(null, wrapper);
        if (rows == 0) {
            return Response.fail("记录不存在或无权操作");
        }
        return Response.success("ok");
    }

    private void saveHistory(String username, NoteDO noteDO, String type, String content) {
        AiHistoryDO history = AiHistoryDO.builder()
                .username(username)
                .noteId(noteDO.getId())
                .noteTitle(noteDO.getTitle())
                .type(type)
                .content(content)
                .createTime(new Date())
                .build();
        aiHistoryMapper.insert(history);
    }

    private String callAi(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            headers.set("Authorization", "Bearer " + apiKey);

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