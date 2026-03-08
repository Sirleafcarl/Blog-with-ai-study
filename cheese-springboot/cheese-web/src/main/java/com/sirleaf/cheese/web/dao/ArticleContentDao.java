package com.sirleaf.cheese.web.dao;

import com.sirleaf.cheese.common.domain.dos.ArticleContentDO;

public interface ArticleContentDao {
    ArticleContentDO selectArticleContentByArticleId(Long articleId);
}
