package com.sirleaf.cheese.web.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.ArticleFavoriteDO;
import com.sirleaf.cheese.common.domain.dos.ArticleLikeDO;
import com.sirleaf.cheese.common.domain.mapper.ArticleFavoriteMapper;
import com.sirleaf.cheese.common.domain.mapper.ArticleLikeMapper;
import com.sirleaf.cheese.web.service.impl.ArticleInteractionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("文章互动服务 - 单元测试")
class ArticleInteractionServiceImplTest {

    @InjectMocks
    private ArticleInteractionServiceImpl interactionService;

    @Mock
    private ArticleLikeMapper articleLikeMapper;

    @Mock
    private ArticleFavoriteMapper articleFavoriteMapper;

    private static final String TEST_USERNAME = "testuser";

    @BeforeEach
    void setUp() {
        // 默认设置已登录状态，匿名场景单独设置
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(TEST_USERNAME, "password"));
    }

    // ---------- toggleLike ----------

    @Test
    @DisplayName("点赞 - 未登录")
    void toggleLike_notLoggedIn() {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("anonymousUser", ""));

        Response response = interactionService.toggleLike(1L);

        assertFalse(response.isSuccess());
        assertEquals("请先登录", response.getMessage());
    }

    @Test
    @DisplayName("点赞 - 首次点赞成功")
    void toggleLike_likeSuccess() {
        when(articleLikeMapper.selectOne(any(QueryWrapper.class))).thenReturn(null);
        when(articleLikeMapper.insert(any(ArticleLikeDO.class))).thenReturn(1);

        Response response = interactionService.toggleLike(1L);

        assertTrue(response.isSuccess());
        assertEquals("点赞成功", response.getData());
        verify(articleLikeMapper).insert(any(ArticleLikeDO.class));
    }

    @Test
    @DisplayName("点赞 - 取消已有点赞")
    void toggleLike_cancelLike() {
        ArticleLikeDO existing = ArticleLikeDO.builder().id(100L).articleId(1L).username(TEST_USERNAME).build();
        when(articleLikeMapper.selectOne(any(QueryWrapper.class))).thenReturn(existing);
        when(articleLikeMapper.deleteById(100L)).thenReturn(1);

        Response response = interactionService.toggleLike(1L);

        assertTrue(response.isSuccess());
        assertEquals("取消点赞", response.getData());
        verify(articleLikeMapper).deleteById(100L);
        verify(articleLikeMapper, never()).insert(any());
    }

    // ---------- toggleFavorite ----------

    @Test
    @DisplayName("收藏 - 未登录")
    void toggleFavorite_notLoggedIn() {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("anonymousUser", ""));

        Response response = interactionService.toggleFavorite(1L);

        assertFalse(response.isSuccess());
        assertEquals("请先登录", response.getMessage());
    }

    @Test
    @DisplayName("收藏 - 首次收藏成功")
    void toggleFavorite_success() {
        when(articleFavoriteMapper.selectOne(any(QueryWrapper.class))).thenReturn(null);
        when(articleFavoriteMapper.insert(any(ArticleFavoriteDO.class))).thenReturn(1);

        Response response = interactionService.toggleFavorite(1L);

        assertTrue(response.isSuccess());
        assertEquals("收藏成功", response.getData());
    }

    @Test
    @DisplayName("收藏 - 取消已有收藏")
    void toggleFavorite_cancel() {
        ArticleFavoriteDO existing = ArticleFavoriteDO.builder().id(200L).articleId(1L).username(TEST_USERNAME).build();
        when(articleFavoriteMapper.selectOne(any(QueryWrapper.class))).thenReturn(existing);
        when(articleFavoriteMapper.deleteById(200L)).thenReturn(1);

        Response response = interactionService.toggleFavorite(1L);

        assertTrue(response.isSuccess());
        assertEquals("取消收藏", response.getData());
    }

    // ---------- getInteractionStatus ----------

    @Test
    @DisplayName("获取互动状态 - 已登录用户")
    @SuppressWarnings("unchecked")
    void getInteractionStatus_loggedIn() {
        // 点赞数2，收藏数3
        when(articleLikeMapper.selectCount(any(QueryWrapper.class)))
                .thenReturn(2L)   // 总点赞数
                .thenReturn(1L);  // 当前用户是否点赞 (>0 = true)
        when(articleFavoriteMapper.selectCount(any(QueryWrapper.class)))
                .thenReturn(3L)   // 总收藏数
                .thenReturn(0L);  // 当前用户未收藏

        Response response = interactionService.getInteractionStatus(1L);

        assertTrue(response.isSuccess());
        Map<String, Object> data = (Map<String, Object>) response.getData();
        assertEquals(2L, data.get("likeCount"));
        assertEquals(3L, data.get("favoriteCount"));
        assertTrue((Boolean) data.get("liked"));
        assertFalse((Boolean) data.get("favorited"));
    }

    @Test
    @DisplayName("获取互动状态 - 匿名用户")
    @SuppressWarnings("unchecked")
    void getInteractionStatus_anonymous() {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("anonymousUser", ""));

        when(articleLikeMapper.selectCount(any(QueryWrapper.class))).thenReturn(5L);
        when(articleFavoriteMapper.selectCount(any(QueryWrapper.class))).thenReturn(2L);

        Response response = interactionService.getInteractionStatus(1L);

        assertTrue(response.isSuccess());
        Map<String, Object> data = (Map<String, Object>) response.getData();
        assertEquals(5L, data.get("likeCount"));
        assertEquals(2L, data.get("favoriteCount"));
        assertFalse((Boolean) data.get("liked"));
        assertFalse((Boolean) data.get("favorited"));
    }
}
