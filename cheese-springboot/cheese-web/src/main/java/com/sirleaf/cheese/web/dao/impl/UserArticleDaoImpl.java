package com.sirleaf.cheese.web.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sirleaf.cheese.common.domain.dos.ArticleDO;
import com.sirleaf.cheese.common.domain.mapper.ArticleMapper;
import com.sirleaf.cheese.web.dao.UserArticleDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
public class UserArticleDaoImpl implements UserArticleDao {

    @Autowired
    private ArticleMapper articleMapper;

    @Override
    public Page<ArticleDO> queryByAuthorAndStatus(Long current, Long size, String authorUsername, Integer status) {
        Page<ArticleDO> page = new Page<>(current, size);
        QueryWrapper<ArticleDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(ArticleDO::getAuthorUsername, authorUsername)
                .eq(Objects.nonNull(status), ArticleDO::getStatus, status)
                .eq(ArticleDO::getIsDeleted, 0)
                .orderByDesc(ArticleDO::getCreateTime);
        return articleMapper.selectPage(page, wrapper);
    }

    @Override
    public ArticleDO queryByIdAndAuthor(Long articleId, String authorUsername) {
        QueryWrapper<ArticleDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(ArticleDO::getId, articleId)
                .eq(ArticleDO::getAuthorUsername, authorUsername)
                .eq(ArticleDO::getIsDeleted, 0);
        return articleMapper.selectOne(wrapper);
    }

    @Override
    public int updateById(ArticleDO articleDO) {
        return articleMapper.updateById(articleDO);
    }

    @Override
    public int insertArticle(ArticleDO articleDO) {
        return articleMapper.insert(articleDO);
    }

    @Override
    public int deleteById(Long articleId) {
        return articleMapper.deleteById(articleId);
    }
}
