package com.sirleaf.cheese.admin.dao;

import com.sirleaf.cheese.common.domain.dos.ArticleCategoryRelDO;

public interface AdminArticleCategoryRelDao {
    int insert(ArticleCategoryRelDO articleCategoryRelDO);

    ArticleCategoryRelDO selectByArticleId(Long articleId);

    int deleteByArticleId(Long articleId);
}
