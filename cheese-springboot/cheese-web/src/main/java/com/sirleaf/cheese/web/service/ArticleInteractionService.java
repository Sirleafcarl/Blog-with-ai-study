package com.sirleaf.cheese.web.service;

import com.sirleaf.cheese.common.Response;

public interface ArticleInteractionService {

    /** 点赞/取消点赞 */
    Response toggleLike(Long articleId);

    /** 收藏/取消收藏 */
    Response toggleFavorite(Long articleId);

    /** 获取文章互动状态（点赞数、收藏数、当前用户是否已点赞/收藏） */
    Response getInteractionStatus(Long articleId);

    /** 获取当前用户点赞的文章列表 */
    Response getMyLikedArticles(int current, int size);

    /** 获取当前用户收藏的文章列表 */
    Response getMyFavoritedArticles(int current, int size);
}
