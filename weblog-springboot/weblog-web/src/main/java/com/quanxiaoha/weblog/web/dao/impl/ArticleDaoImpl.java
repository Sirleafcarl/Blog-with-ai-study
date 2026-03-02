package com.quanxiaoha.weblog.web.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.quanxiaoha.weblog.common.domain.mapper.ArticleMapper;
import com.quanxiaoha.weblog.common.domain.dos.ArticleDO;
import com.quanxiaoha.weblog.web.dao.ArticleDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class ArticleDaoImpl implements ArticleDao {
    @Autowired
    private ArticleMapper articleMapper;

    @Override
    public IPage<ArticleDO> queryArticlePageList(long current, long size) {
        Page<ArticleDO> page = new Page<>(current, size);
        QueryWrapper<ArticleDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(ArticleDO::getIsPublished, true)
                .orderByDesc(ArticleDO::getIsTop)
                .orderByDesc(ArticleDO::getCreateTime);
        return articleMapper.selectPage(page, wrapper);
    }

    @Override
    public ArticleDO selectArticleById(Long articleId) {
        return articleMapper.selectById(articleId);
    }

    @Override
    public ArticleDO selectPreArticle(Long articleId) {
        QueryWrapper<ArticleDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(ArticleDO::getIsPublished, true)
                .gt(ArticleDO::getId, articleId)
                .orderByAsc(ArticleDO::getId)
                .last("limit 1");
        return articleMapper.selectOne(wrapper);
    }

    @Override
    public ArticleDO selectNextArticle(Long articleId) {
        QueryWrapper<ArticleDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(ArticleDO::getIsPublished, true)
                .lt(ArticleDO::getId, articleId)
                .orderByDesc(ArticleDO::getId)
                .last("limit 1");
        return articleMapper.selectOne(wrapper);
    }

    @Override
    public IPage<ArticleDO> queryArticlePageListByArticleIds(Long current, Long size, List<Long> articleIds) {
        Page<ArticleDO> page = new Page<>(current, size);
        QueryWrapper<ArticleDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .in(ArticleDO::getId, articleIds)
                .eq(ArticleDO::getIsPublished, true)
                .orderByDesc(ArticleDO::getIsTop)
                .orderByDesc(ArticleDO::getCreateTime);
        return articleMapper.selectPage(page, wrapper);
    }

    @Override
    public IPage<ArticleDO> searchByKeyword(long current, long size, String keyword) {
        Page<ArticleDO> page = new Page<>(current, size);
        QueryWrapper<ArticleDO> wrapper = new QueryWrapper<>();
        if (keyword != null && !keyword.trim().isEmpty()) {
            wrapper.lambda()
                    .eq(ArticleDO::getIsPublished, true)
                    .like(ArticleDO::getTitle, keyword.trim())
                    .orderByDesc(ArticleDO::getCreateTime);
        } else {
            wrapper.lambda()
                    .eq(ArticleDO::getIsPublished, true)
                    .orderByDesc(ArticleDO::getCreateTime);
        }
        return articleMapper.selectPage(page, wrapper);
    }
}
