package com.sirleaf.cheese.web.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sirleaf.cheese.common.domain.mapper.ArticleContentMapper;
import com.sirleaf.cheese.common.domain.dos.ArticleContentDO;
import com.sirleaf.cheese.web.dao.ArticleContentDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class ArticleContentDaoImpl implements ArticleContentDao {
    @Autowired
    private ArticleContentMapper articleContentMapper;

    @Override
    public ArticleContentDO selectArticleContentByArticleId(Long articleId) {
        QueryWrapper<ArticleContentDO> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(ArticleContentDO::getArticleId, articleId);
        return articleContentMapper.selectOne(wrapper);
    }
}
