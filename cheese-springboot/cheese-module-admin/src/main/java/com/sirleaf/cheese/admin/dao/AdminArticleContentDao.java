package com.sirleaf.cheese.admin.dao;

import com.sirleaf.cheese.common.domain.dos.ArticleContentDO;

public interface AdminArticleContentDao {
    int insertArticleContent(ArticleContentDO articleContentDO);

    ArticleContentDO queryByArticleId(Long articleId);

    int deleteByArticleId(Long articleId);

    int updateByArticleId(ArticleContentDO articleContentDO);
}
