package com.sirleaf.cheese.admin.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sirleaf.cheese.admin.dao.AdminArticleCategoryRelDao;
import com.sirleaf.cheese.common.domain.mapper.ArticleCategoryRelMapper;
import com.sirleaf.cheese.common.domain.dos.ArticleCategoryRelDO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class AdminArticleCategoryRelDaoImpl implements AdminArticleCategoryRelDao {
    @Autowired
    private ArticleCategoryRelMapper articleCategoryRelMapper;

    @Override
    public int insert(ArticleCategoryRelDO articleCategoryRelDO) {
        return articleCategoryRelMapper.insert(articleCategoryRelDO);
    }

    @Override
    public ArticleCategoryRelDO selectByArticleId(Long articleId) {
        QueryWrapper<ArticleCategoryRelDO> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(ArticleCategoryRelDO::getArticleId, articleId);
        return articleCategoryRelMapper.selectOne(wrapper);
    }

    @Override
    public int deleteByArticleId(Long articleId) {
        QueryWrapper<ArticleCategoryRelDO> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(ArticleCategoryRelDO::getArticleId, articleId);
        return articleCategoryRelMapper.delete(wrapper);
    }
}
