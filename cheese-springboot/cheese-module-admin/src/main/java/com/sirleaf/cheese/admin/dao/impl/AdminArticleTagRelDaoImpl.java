package com.sirleaf.cheese.admin.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sirleaf.cheese.admin.dao.AdminArticleTagRelDao;
import com.sirleaf.cheese.common.domain.mapper.ArticleTagRelMapper;
import com.sirleaf.cheese.common.domain.dos.ArticleTagRelDO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class AdminArticleTagRelDaoImpl implements AdminArticleTagRelDao {
    @Autowired
    private ArticleTagRelMapper articleTagRelMapper;

    @Override
    public void insertBatch(List<ArticleTagRelDO> articleTagRelDOS) {
        articleTagRelMapper.insertBatchSomeColumn(articleTagRelDOS);
    }

    @Override
    public List<ArticleTagRelDO> selectByArticleId(Long articleId) {
        QueryWrapper<ArticleTagRelDO> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(ArticleTagRelDO::getArticleId, articleId);
        return articleTagRelMapper.selectList(wrapper);
    }

    @Override
    public int deleteByArticleId(Long articleId) {
        QueryWrapper<ArticleTagRelDO> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(ArticleTagRelDO::getArticleId, articleId);
        return articleTagRelMapper.delete(wrapper);
    }
}
