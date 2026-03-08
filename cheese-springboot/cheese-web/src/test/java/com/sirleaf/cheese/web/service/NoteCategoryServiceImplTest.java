package com.sirleaf.cheese.web.service;

import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.NoteCategoryDO;
import com.sirleaf.cheese.web.dao.NoteCategoryDao;
import com.sirleaf.cheese.web.model.vo.notecategory.AddNoteCategoryReqVO;
import com.sirleaf.cheese.web.model.vo.notecategory.DeleteNoteCategoryReqVO;
import com.sirleaf.cheese.web.service.impl.NoteCategoryServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("笔记分类服务 - 单元测试")
class NoteCategoryServiceImplTest {

    @InjectMocks
    private NoteCategoryServiceImpl noteCategoryService;

    @Mock
    private NoteCategoryDao noteCategoryDao;

    private static final String TEST_USERNAME = "testuser";

    @BeforeEach
    void setUp() {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(TEST_USERNAME, "password"));
    }

    @Test
    @DisplayName("添加分类 - 成功")
    void addCategory_success() {
        AddNoteCategoryReqVO reqVO = new AddNoteCategoryReqVO();
        reqVO.setName("Java学习");

        when(noteCategoryDao.insert(any(NoteCategoryDO.class))).thenReturn(1);

        Response response = noteCategoryService.addCategory(reqVO);

        assertTrue(response.isSuccess());
        verify(noteCategoryDao).insert(argThat(cat ->
                TEST_USERNAME.equals(cat.getUsername())
                        && "Java学习".equals(cat.getName())
                        && !cat.getIsDeleted()
        ));
    }

    @Test
    @DisplayName("添加分类 - 名称去除空格")
    void addCategory_trimName() {
        AddNoteCategoryReqVO reqVO = new AddNoteCategoryReqVO();
        reqVO.setName("  有空格的名称  ");

        when(noteCategoryDao.insert(any(NoteCategoryDO.class))).thenReturn(1);

        Response response = noteCategoryService.addCategory(reqVO);

        assertTrue(response.isSuccess());
        verify(noteCategoryDao).insert(argThat(cat -> "有空格的名称".equals(cat.getName())));
    }

    @Test
    @DisplayName("添加分类 - 重复名称")
    void addCategory_duplicate() {
        AddNoteCategoryReqVO reqVO = new AddNoteCategoryReqVO();
        reqVO.setName("已存在分类");

        when(noteCategoryDao.insert(any(NoteCategoryDO.class)))
                .thenThrow(new DuplicateKeyException("Duplicate entry"));

        Response response = noteCategoryService.addCategory(reqVO);

        assertFalse(response.isSuccess());
        assertEquals("该分类名称已存在", response.getMessage());
    }

    @Test
    @DisplayName("删除分类 - 成功")
    void deleteCategory_success() {
        DeleteNoteCategoryReqVO reqVO = new DeleteNoteCategoryReqVO();
        reqVO.setId(1L);

        NoteCategoryDO exist = NoteCategoryDO.builder().id(1L).username(TEST_USERNAME).build();
        when(noteCategoryDao.queryById(1L, TEST_USERNAME)).thenReturn(exist);
        when(noteCategoryDao.deleteById(1L, TEST_USERNAME)).thenReturn(1);

        Response response = noteCategoryService.deleteCategory(reqVO);

        assertTrue(response.isSuccess());
        verify(noteCategoryDao).deleteById(1L, TEST_USERNAME);
    }

    @Test
    @DisplayName("删除分类 - 不存在")
    void deleteCategory_notFound() {
        DeleteNoteCategoryReqVO reqVO = new DeleteNoteCategoryReqVO();
        reqVO.setId(999L);

        when(noteCategoryDao.queryById(999L, TEST_USERNAME)).thenReturn(null);

        Response response = noteCategoryService.deleteCategory(reqVO);

        assertFalse(response.isSuccess());
        assertEquals("分类不存在或无权删除", response.getMessage());
    }

    @Test
    @DisplayName("查询分类列表 - 成功")
    @SuppressWarnings("unchecked")
    void listCategories_success() {
        NoteCategoryDO cat1 = NoteCategoryDO.builder().id(1L).name("Java").username(TEST_USERNAME).build();
        NoteCategoryDO cat2 = NoteCategoryDO.builder().id(2L).name("Python").username(TEST_USERNAME).build();
        when(noteCategoryDao.queryListByUsername(TEST_USERNAME)).thenReturn(Arrays.asList(cat1, cat2));

        Response response = noteCategoryService.listCategories();

        assertTrue(response.isSuccess());
        List<Map<String, Object>> data = (List<Map<String, Object>>) response.getData();
        assertEquals(2, data.size());
        assertEquals("Java", data.get(0).get("name"));
        assertEquals("Python", data.get(1).get("name"));
    }

    @Test
    @DisplayName("查询分类列表 - 空列表")
    @SuppressWarnings("unchecked")
    void listCategories_empty() {
        when(noteCategoryDao.queryListByUsername(TEST_USERNAME)).thenReturn(java.util.Collections.emptyList());

        Response response = noteCategoryService.listCategories();

        assertTrue(response.isSuccess());
        List<Map<String, Object>> data = (List<Map<String, Object>>) response.getData();
        assertTrue(data.isEmpty());
    }
}
