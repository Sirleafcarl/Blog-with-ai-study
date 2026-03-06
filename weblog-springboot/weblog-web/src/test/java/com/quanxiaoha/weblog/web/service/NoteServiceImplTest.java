package com.quanxiaoha.weblog.web.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.NoteCategoryDO;
import com.quanxiaoha.weblog.common.domain.dos.NoteDO;
import com.quanxiaoha.weblog.web.dao.NoteCategoryDao;
import com.quanxiaoha.weblog.web.dao.NoteDao;
import com.quanxiaoha.weblog.web.model.vo.note.*;
import com.quanxiaoha.weblog.web.service.impl.NoteServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("笔记服务 - 单元测试")
class NoteServiceImplTest {

    @InjectMocks
    private NoteServiceImpl noteService;

    @Mock
    private NoteDao noteDao;

    @Mock
    private NoteCategoryDao noteCategoryDao;

    private static final String TEST_USERNAME = "testuser";

    @BeforeEach
    void setUp() {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(TEST_USERNAME, "password"));
    }

    // ---------- 创建笔记 ----------

    @Test
    @DisplayName("创建笔记 - 成功")
    void createNote_success() {
        CreateNoteReqVO reqVO = new CreateNoteReqVO();
        reqVO.setTitle("测试笔记");
        reqVO.setContent("测试内容");
        reqVO.setCategoryId(1L);

        when(noteDao.insertNote(any(NoteDO.class))).thenReturn(1);

        Response response = noteService.createNote(reqVO);

        assertTrue(response.isSuccess());
        verify(noteDao).insertNote(argThat(note ->
                TEST_USERNAME.equals(note.getUsername())
                        && "测试笔记".equals(note.getTitle())
                        && "测试内容".equals(note.getContent())
                        && note.getCategoryId().equals(1L)
                        && !note.getIsDeleted()
        ));
    }

    @Test
    @DisplayName("创建笔记 - 内容为null时设为空串")
    void createNote_nullContentBecomesEmpty() {
        CreateNoteReqVO reqVO = new CreateNoteReqVO();
        reqVO.setTitle("仅标题");
        reqVO.setContent(null);

        when(noteDao.insertNote(any(NoteDO.class))).thenReturn(1);

        Response response = noteService.createNote(reqVO);

        assertTrue(response.isSuccess());
        verify(noteDao).insertNote(argThat(note -> "".equals(note.getContent())));
    }

    // ---------- 更新笔记 ----------

    @Test
    @DisplayName("更新笔记 - 成功")
    void updateNote_success() {
        UpdateNoteReqVO reqVO = new UpdateNoteReqVO();
        reqVO.setId(1L);
        reqVO.setTitle("新标题");
        reqVO.setContent("新内容");
        reqVO.setCategoryId(2L);

        NoteDO existNote = NoteDO.builder().id(1L).username(TEST_USERNAME).build();
        when(noteDao.queryById(1L, TEST_USERNAME)).thenReturn(existNote);
        when(noteDao.updateNote(any(NoteDO.class))).thenReturn(1);

        Response response = noteService.updateNote(reqVO);

        assertTrue(response.isSuccess());
        verify(noteDao).updateNote(argThat(note ->
                note.getId().equals(1L)
                        && "新标题".equals(note.getTitle())
                        && note.getCategoryId().equals(2L)
        ));
    }

    @Test
    @DisplayName("更新笔记 - 笔记不存在")
    void updateNote_notFound() {
        UpdateNoteReqVO reqVO = new UpdateNoteReqVO();
        reqVO.setId(999L);
        reqVO.setTitle("不存在");

        when(noteDao.queryById(999L, TEST_USERNAME)).thenReturn(null);

        Response response = noteService.updateNote(reqVO);

        assertFalse(response.isSuccess());
        assertEquals("笔记不存在或无权修改", response.getMessage());
        verify(noteDao, never()).updateNote(any());
    }

    // ---------- 删除笔记 ----------

    @Test
    @DisplayName("删除笔记 - 成功")
    void deleteNote_success() {
        DeleteNoteReqVO reqVO = new DeleteNoteReqVO();
        reqVO.setId(1L);

        NoteDO existNote = NoteDO.builder().id(1L).username(TEST_USERNAME).build();
        when(noteDao.queryById(1L, TEST_USERNAME)).thenReturn(existNote);
        when(noteDao.deleteById(1L, TEST_USERNAME)).thenReturn(1);

        Response response = noteService.deleteNote(reqVO);

        assertTrue(response.isSuccess());
        verify(noteDao).deleteById(1L, TEST_USERNAME);
    }

    @Test
    @DisplayName("删除笔记 - 笔记不存在")
    void deleteNote_notFound() {
        DeleteNoteReqVO reqVO = new DeleteNoteReqVO();
        reqVO.setId(999L);

        when(noteDao.queryById(999L, TEST_USERNAME)).thenReturn(null);

        Response response = noteService.deleteNote(reqVO);

        assertFalse(response.isSuccess());
        assertEquals("笔记不存在或无权删除", response.getMessage());
    }

    // ---------- 获取详情 ----------

    @Test
    @DisplayName("获取笔记详情 - 成功（含分类）")
    void getNoteDetail_successWithCategory() {
        NoteDO note = NoteDO.builder()
                .id(1L).title("标题").content("内容")
                .categoryId(10L).username(TEST_USERNAME)
                .createTime(new Date()).updateTime(new Date())
                .build();
        when(noteDao.queryById(1L, TEST_USERNAME)).thenReturn(note);

        NoteCategoryDO cat = NoteCategoryDO.builder().id(10L).name("Java学习").build();
        when(noteCategoryDao.queryById(10L, TEST_USERNAME)).thenReturn(cat);

        Response response = noteService.getNoteDetail(1L);

        assertTrue(response.isSuccess());
        NoteDetailRspVO detail = (NoteDetailRspVO) response.getData();
        assertEquals("标题", detail.getTitle());
        assertEquals("内容", detail.getContent());
        assertEquals("Java学习", detail.getCategoryName());
    }

    @Test
    @DisplayName("获取笔记详情 - 笔记不存在")
    void getNoteDetail_notFound() {
        when(noteDao.queryById(999L, TEST_USERNAME)).thenReturn(null);

        Response response = noteService.getNoteDetail(999L);

        assertFalse(response.isSuccess());
        assertEquals("笔记不存在", response.getMessage());
    }

    // ---------- 列表查询 ----------

    @Test
    @DisplayName("分页查询笔记列表 - 成功")
    void listNotes_success() {
        QueryNotePageListReqVO reqVO = new QueryNotePageListReqVO();
        reqVO.setCurrent(1L);
        reqVO.setSize(10L);

        NoteDO note1 = NoteDO.builder()
                .id(1L).title("笔记1").content("内容1").categoryId(10L)
                .createTime(new Date()).updateTime(new Date())
                .build();
        IPage<NoteDO> page = new Page<>(1, 10, 1);
        page.setRecords(Collections.singletonList(note1));
        when(noteDao.queryPageList(1L, 10L, TEST_USERNAME, null, null)).thenReturn(page);

        NoteCategoryDO cat = NoteCategoryDO.builder().id(10L).name("分类A").build();
        when(noteCategoryDao.queryListByUsername(TEST_USERNAME)).thenReturn(Collections.singletonList(cat));

        PageResponse response = noteService.listNotes(reqVO);

        assertTrue(response.isSuccess());
        assertEquals(1, response.getTotal());
        assertNotNull(response.getData());
    }
}
