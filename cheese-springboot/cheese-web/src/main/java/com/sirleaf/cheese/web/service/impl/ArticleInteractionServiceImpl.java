package com.sirleaf.cheese.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.ArticleDO;
import com.sirleaf.cheese.common.domain.dos.ArticleFavoriteDO;
import com.sirleaf.cheese.common.domain.dos.ArticleLikeDO;
import com.sirleaf.cheese.common.domain.mapper.ArticleFavoriteMapper;
import com.sirleaf.cheese.common.domain.mapper.ArticleLikeMapper;
import com.sirleaf.cheese.common.domain.mapper.ArticleMapper;
import com.sirleaf.cheese.web.service.ArticleInteractionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Slf4j
public class ArticleInteractionServiceImpl implements ArticleInteractionService {

    @Autowired
    private ArticleLikeMapper articleLikeMapper;

    @Autowired
    private ArticleFavoriteMapper articleFavoriteMapper;

    @Autowired
    private ArticleMapper articleMapper;

    private String currentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || "anonymousUser".equals(auth.getName())) {
            return null;
        }
        return auth.getName();
    }

    @Override
    public Response toggleLike(Long articleId) {
        String username = currentUsername();
        if (username == null) return Response.fail("请先登录");

        QueryWrapper<ArticleLikeDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(ArticleLikeDO::getArticleId, articleId)
                .eq(ArticleLikeDO::getUsername, username);
        ArticleLikeDO exist = articleLikeMapper.selectOne(wrapper);

        if (exist != null) {
            articleLikeMapper.deleteById(exist.getId());
            return Response.success("取消点赞");
        } else {
            ArticleLikeDO like = ArticleLikeDO.builder()
                    .articleId(articleId)
                    .username(username)
                    .createTime(new Date())
                    .build();
            articleLikeMapper.insert(like);
            return Response.success("点赞成功");
        }
    }

    @Override
    public Response toggleFavorite(Long articleId) {
        String username = currentUsername();
        if (username == null) return Response.fail("请先登录");

        QueryWrapper<ArticleFavoriteDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(ArticleFavoriteDO::getArticleId, articleId)
                .eq(ArticleFavoriteDO::getUsername, username);
        ArticleFavoriteDO exist = articleFavoriteMapper.selectOne(wrapper);

        if (exist != null) {
            articleFavoriteMapper.deleteById(exist.getId());
            return Response.success("取消收藏");
        } else {
            ArticleFavoriteDO fav = ArticleFavoriteDO.builder()
                    .articleId(articleId)
                    .username(username)
                    .createTime(new Date())
                    .build();
            articleFavoriteMapper.insert(fav);
            return Response.success("收藏成功");
        }
    }

    @Override
    public Response getInteractionStatus(Long articleId) {
        String username = currentUsername();

        // 点赞数
        QueryWrapper<ArticleLikeDO> likeCountWrapper = new QueryWrapper<>();
        likeCountWrapper.lambda().eq(ArticleLikeDO::getArticleId, articleId);
        long likeCount = articleLikeMapper.selectCount(likeCountWrapper);

        // 收藏数
        QueryWrapper<ArticleFavoriteDO> favCountWrapper = new QueryWrapper<>();
        favCountWrapper.lambda().eq(ArticleFavoriteDO::getArticleId, articleId);
        long favoriteCount = articleFavoriteMapper.selectCount(favCountWrapper);

        boolean liked = false;
        boolean favorited = false;
        if (username != null) {
            QueryWrapper<ArticleLikeDO> likeWrapper = new QueryWrapper<>();
            likeWrapper.lambda()
                    .eq(ArticleLikeDO::getArticleId, articleId)
                    .eq(ArticleLikeDO::getUsername, username);
            liked = articleLikeMapper.selectCount(likeWrapper) > 0;

            QueryWrapper<ArticleFavoriteDO> favWrapper = new QueryWrapper<>();
            favWrapper.lambda()
                    .eq(ArticleFavoriteDO::getArticleId, articleId)
                    .eq(ArticleFavoriteDO::getUsername, username);
            favorited = articleFavoriteMapper.selectCount(favWrapper) > 0;
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("likeCount", likeCount);
        result.put("favoriteCount", favoriteCount);
        result.put("liked", liked);
        result.put("favorited", favorited);

        return Response.success(result);
    }

    @Override
    public Response getMyLikedArticles(int current, int size) {
        String username = currentUsername();
        if (username == null) return Response.fail("请先登录");
        return getMyInteractionArticles(username, "like", current, size);
    }

    @Override
    public Response getMyFavoritedArticles(int current, int size) {
        String username = currentUsername();
        if (username == null) return Response.fail("请先登录");
        return getMyInteractionArticles(username, "favorite", current, size);
    }

    private Response getMyInteractionArticles(String username, String type, int current, int size) {
        // 1. 查询用户的互动记录，按时间倒序
        List<Long> articleIds;
        long total;

        if ("like".equals(type)) {
            QueryWrapper<ArticleLikeDO> countWrapper = new QueryWrapper<>();
            countWrapper.lambda().eq(ArticleLikeDO::getUsername, username);
            total = articleLikeMapper.selectCount(countWrapper);

            QueryWrapper<ArticleLikeDO> wrapper = new QueryWrapper<>();
            wrapper.lambda().eq(ArticleLikeDO::getUsername, username)
                    .orderByDesc(ArticleLikeDO::getCreateTime);
            wrapper.last("LIMIT " + (current - 1) * size + "," + size);
            List<ArticleLikeDO> records = articleLikeMapper.selectList(wrapper);
            articleIds = new ArrayList<>();
            for (ArticleLikeDO r : records) {
                articleIds.add(r.getArticleId());
            }
        } else {
            QueryWrapper<ArticleFavoriteDO> countWrapper = new QueryWrapper<>();
            countWrapper.lambda().eq(ArticleFavoriteDO::getUsername, username);
            total = articleFavoriteMapper.selectCount(countWrapper);

            QueryWrapper<ArticleFavoriteDO> wrapper = new QueryWrapper<>();
            wrapper.lambda().eq(ArticleFavoriteDO::getUsername, username)
                    .orderByDesc(ArticleFavoriteDO::getCreateTime);
            wrapper.last("LIMIT " + (current - 1) * size + "," + size);
            List<ArticleFavoriteDO> records = articleFavoriteMapper.selectList(wrapper);
            articleIds = new ArrayList<>();
            for (ArticleFavoriteDO r : records) {
                articleIds.add(r.getArticleId());
            }
        }

        // 2. 批量查询文章信息
        List<Map<String, Object>> items = new ArrayList<>();
        if (!articleIds.isEmpty()) {
            QueryWrapper<ArticleDO> articleWrapper = new QueryWrapper<>();
            articleWrapper.lambda().in(ArticleDO::getId, articleIds);
            List<ArticleDO> articles = articleMapper.selectList(articleWrapper);

            // 按 articleIds 顺序排列
            Map<Long, ArticleDO> articleMap = new LinkedHashMap<>();
            for (ArticleDO a : articles) {
                articleMap.put(a.getId(), a);
            }

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            for (Long id : articleIds) {
                ArticleDO a = articleMap.get(id);
                if (a != null) {
                    Map<String, Object> item = new LinkedHashMap<>();
                    item.put("id", a.getId());
                    item.put("title", a.getTitle());
                    item.put("titleImage", a.getTitleImage());
                    item.put("description", a.getDescription());
                    item.put("createTime", sdf.format(a.getCreateTime()));
                    items.add(item);
                }
            }
        }

        Map<String, Object> page = new LinkedHashMap<>();
        page.put("records", items);
        page.put("total", total);
        page.put("current", current);
        page.put("size", size);

        return Response.success(page);
    }
}
