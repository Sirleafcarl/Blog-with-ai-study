package com.quanxiaoha.weblog.web.dao;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.quanxiaoha.weblog.common.domain.dos.ArticleDO;

public interface UserArticleDao {
    Page<ArticleDO> queryByAuthorAndStatus(Long current, Long size, String authorUsername, Integer status);

    ArticleDO queryByIdAndAuthor(Long articleId, String authorUsername);

    int updateById(ArticleDO articleDO);

    int insertArticle(ArticleDO articleDO);

    int deleteById(Long articleId);
}
