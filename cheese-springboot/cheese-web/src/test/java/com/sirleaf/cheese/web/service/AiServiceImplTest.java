package com.sirleaf.cheese.web.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.NoteDO;
import com.sirleaf.cheese.web.dao.NoteDao;
import com.sirleaf.cheese.web.model.vo.ai.AiNoteReqVO;
import com.sirleaf.cheese.web.service.impl.AiServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AI服务 - 单元测试")
class AiServiceImplTest {

    @InjectMocks
    private AiServiceImpl aiService;

    @Mock
    private NoteDao noteDao;

    @Mock
    private RestTemplate restTemplate;

    @Spy
    private ObjectMapper objectMapper = new ObjectMapper();

    private static final String TEST_USERNAME = "testuser";

    @BeforeEach
    void setUp() {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(TEST_USERNAME, "password"));
        ReflectionTestUtils.setField(aiService, "apiKey", "test-api-key");
        ReflectionTestUtils.setField(aiService, "model", "qwen-turbo");
    }

    // ---------- generateQuestions ----------

    @Test
    @DisplayName("生成题目 - 笔记不存在")
    void generateQuestions_noteNotFound() {
        AiNoteReqVO reqVO = new AiNoteReqVO();
        reqVO.setNoteId(999L);

        when(noteDao.queryById(999L, TEST_USERNAME)).thenReturn(null);

        Response response = aiService.generateQuestions(reqVO);

        assertFalse(response.isSuccess());
        assertEquals("笔记不存在或无权访问", response.getMessage());
    }

    @Test
    @DisplayName("生成题目 - 笔记内容为空")
    void generateQuestions_emptyContent() {
        AiNoteReqVO reqVO = new AiNoteReqVO();
        reqVO.setNoteId(1L);

        NoteDO note = NoteDO.builder().id(1L).title("空笔记").content("  ").username(TEST_USERNAME).build();
        when(noteDao.queryById(1L, TEST_USERNAME)).thenReturn(note);

        Response response = aiService.generateQuestions(reqVO);

        assertFalse(response.isSuccess());
        assertEquals("笔记内容为空，无法生成题目", response.getMessage());
    }

    @Test
    @DisplayName("生成题目 - AI调用成功")
    void generateQuestions_success() {
        AiNoteReqVO reqVO = new AiNoteReqVO();
        reqVO.setNoteId(1L);

        NoteDO note = NoteDO.builder()
                .id(1L).title("Java基础").content("Java是面向对象编程语言")
                .username(TEST_USERNAME).build();
        when(noteDao.queryById(1L, TEST_USERNAME)).thenReturn(note);

        String aiResponseBody = "{\"choices\":[{\"message\":{\"content\":\"【第1题】Java是什么？\\nA. 编程语言\\nB. 数据库\\nC. 操作系统\\nD. 浏览器\\n【正确答案】A\\n【解析】Java是编程语言\"}}]}";
        when(restTemplate.postForEntity(anyString(), any(HttpEntity.class), eq(String.class)))
                .thenReturn(new ResponseEntity<>(aiResponseBody, HttpStatus.OK));

        Response response = aiService.generateQuestions(reqVO);

        assertTrue(response.isSuccess());
        assertNotNull(response.getData());
    }

    @Test
    @DisplayName("生成题目 - AI调用失败返回null")
    void generateQuestions_aiFail() {
        AiNoteReqVO reqVO = new AiNoteReqVO();
        reqVO.setNoteId(1L);

        NoteDO note = NoteDO.builder()
                .id(1L).title("标题").content("有内容")
                .username(TEST_USERNAME).build();
        when(noteDao.queryById(1L, TEST_USERNAME)).thenReturn(note);

        when(restTemplate.postForEntity(anyString(), any(HttpEntity.class), eq(String.class)))
                .thenThrow(new RuntimeException("Connection timeout"));

        Response response = aiService.generateQuestions(reqVO);

        assertFalse(response.isSuccess());
        assertEquals("AI 服务调用失败，请检查 API Key 配置或稍后重试", response.getMessage());
    }

    // ---------- reviewNote ----------

    @Test
    @DisplayName("批改笔记 - 成功并提取分数")
    void reviewNote_successWithScore() {
        AiNoteReqVO reqVO = new AiNoteReqVO();
        reqVO.setNoteId(1L);

        NoteDO note = NoteDO.builder()
                .id(1L).title("学习笔记").content("详细内容...")
                .username(TEST_USERNAME).build();
        when(noteDao.queryById(1L, TEST_USERNAME)).thenReturn(note);

        String aiResponseBody = "{\"choices\":[{\"message\":{\"content\":\"【综合评分】85 / 100分\\n【知识完整性】较好\\n【总体点评】写得不错\"}}]}";
        when(restTemplate.postForEntity(anyString(), any(HttpEntity.class), eq(String.class)))
                .thenReturn(new ResponseEntity<>(aiResponseBody, HttpStatus.OK));

        Response response = aiService.reviewNote(reqVO);

        assertTrue(response.isSuccess());
    }

    @Test
    @DisplayName("批改笔记 - 笔记不存在")
    void reviewNote_noteNotFound() {
        AiNoteReqVO reqVO = new AiNoteReqVO();
        reqVO.setNoteId(999L);

        when(noteDao.queryById(999L, TEST_USERNAME)).thenReturn(null);

        Response response = aiService.reviewNote(reqVO);

        assertFalse(response.isSuccess());
        assertEquals("笔记不存在或无权访问", response.getMessage());
    }

    @Test
    @DisplayName("批改笔记 - 内容为空")
    void reviewNote_emptyContent() {
        AiNoteReqVO reqVO = new AiNoteReqVO();
        reqVO.setNoteId(1L);

        NoteDO note = NoteDO.builder().id(1L).title("空笔记").content("").username(TEST_USERNAME).build();
        when(noteDao.queryById(1L, TEST_USERNAME)).thenReturn(note);

        Response response = aiService.reviewNote(reqVO);

        assertFalse(response.isSuccess());
        assertEquals("笔记内容为空，无法批改", response.getMessage());
    }
}
