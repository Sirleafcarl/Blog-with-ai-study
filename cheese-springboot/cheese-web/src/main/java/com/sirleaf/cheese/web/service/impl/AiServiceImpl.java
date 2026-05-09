package com.sirleaf.cheese.web.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.AiHistoryDO;
import com.sirleaf.cheese.common.domain.dos.NoteDO;
import com.sirleaf.cheese.common.domain.mapper.AiHistoryMapper;
import com.sirleaf.cheese.web.dao.NoteDao;
import com.sirleaf.cheese.web.model.vo.ai.AiNoteReqVO;
import com.sirleaf.cheese.web.service.AiService;
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

        String qType = reqVO.getQuestionType() != null ? reqVO.getQuestionType() : "混合题型";
        Integer qCount = reqVO.getQuestionCount() != null ? reqVO.getQuestionCount() : 5;
        String diff = reqVO.getDifficulty() != null ? reqVO.getDifficulty() : "中等难度";

        String prompt = "你是一位资深的教师。请根据以下笔记内容，为学生生成一份巩固复习题。\n"
                + "要求如下：\n"
                + "1. 题目类型为主要求：" + qType + "\n"
                + "2. 题目数量：" + qCount + " 题\n"
                + "3. 难度级别：" + diff + "\n"
                + "格式参考要求（非常重要，请严格遵守！）：\n"
                + "1. 每道题目必须以【第N题】开头（例如：【第1题】这是题目内容）。\n"
                + "2. 如果是选择题，每一行提供一个选项，以 A/B/C/D 开头，如 A. 选项A。\n"
                + "3. 并在每道题的最后附上：【正确答案】XX（单选题填A-D，判断题填正确/错误）\n"
                + "4. 接着附上：【解析】详细的分析解释。\n\n"
                + "笔记标题：" + noteDO.getTitle() + "\n\n"
                + "笔记内容：\n" + content;

        String result = callAi(prompt);
        if (result == null) {
            return Response.fail("AI 服务调用失败，请检查 API Key 配置或稍后重试");
        }

        // 保存历史记录
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

        // 保存历史记录
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

    @Override
    public Response generateArticleContent(String topic) {
        if (topic == null || topic.trim().isEmpty()) {
            return Response.fail("题目不能为空");
        }
        String prompt = "你是一位专业的博客作者，擅长撰写技术和知识类文章。\n"
                + "请根据以下题目，生成一篇结构清晰、内容丰富的博客文章。\n"
                + "要求：\n"
                + "1. 使用 Markdown 格式\n"
                + "2. 包含合适的标题层级（## ### 等）\n"
                + "3. 适当使用列表、代码块、引用等 Markdown 元素\n"
                + "4. 内容专业、逻辑清晰\n"
                + "5. 字数在800-1500字之间\n\n"
                + "题目：" + topic.trim();
        String result = callAi(prompt);
        if (result == null) {
            return Response.fail("AI 服务调用失败，请检查 API Key 配置或稍后重试");
        }
        return Response.success(result);
    }

    @Override
    public Response polishArticle(String content, String mode) {
        if (content == null || content.trim().isEmpty()) {
            return Response.fail("文章内容不能为空，请先在编辑器中写入内容");
        }
        String prompt;
        switch (mode == null ? "polish" : mode) {
            case "proofread":
                prompt = "你是一位专业的文章编辑，请对以下博客文章进行全面纠错。\n"
                        + "要求：\n"
                        + "1. 检查语法错误、错别字、标点符号错误\n"
                        + "2. 检查逻辑错误或表述不清的地方\n"
                        + "3. 用 Markdown 格式输出错误列表，每个错误注明『原文』和『建议修改』\n"
                        + "4. 最后给出总体评价\n\n"
                        + "文章内容：\n" + content.trim();
                break;
            case "optimize":
                prompt = "你是一位专业的内容策略师，请对以下博客文章提供结构化的优化建议。\n"
                        + "要求：\n"
                        + "1. 分析文章结构是否合理\n"
                        + "2. 内容是否充实、逻辑是否清晰\n"
                        + "3. 标题层级和段落划分是否合适\n"
                        + "4. 用 Markdown 格式输出具体的改进建议，按重要程度排列\n\n"
                        + "文章内容：\n" + content.trim();
                break;
            default: // polish
                prompt = "你是一位专业的文字润色师，请对以下博客文章进行润色，使其更加流畅、专业、引人入胜。\n"
                        + "要求：\n"
                        + "1. 保持原文的核心含义和结构不变\n"
                        + "2. 改善句式和用词，使文章更加生动\n"
                        + "3. 确保段落过渡自然\n"
                        + "4. 直接输出润色后的完整 Markdown 文章，不需要额外说明\n\n"
                        + "原文：\n" + content.trim();
                break;
        }
        String result = callAi(prompt);
        if (result == null) {
            return Response.fail("AI 服务调用失败，请稍后重试");
        }
        return Response.success(result);
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
