package com.sirleaf.cheese.web.dao;

import com.sirleaf.cheese.common.domain.dos.ArticleTagRelDO;

import java.util.List;

public interface ArticleTagRelDao {

    List<ArticleTagRelDO> selectByArticleIds(List<Long> articleIds);

    List<ArticleTagRelDO> selectByTagId(Long queryTagId);

    List<ArticleTagRelDO> selectByArticleId(Long articleId);
}
