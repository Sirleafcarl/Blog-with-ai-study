package com.sirleaf.cheese.web.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sirleaf.cheese.common.domain.dos.CommentDO;
import com.sirleaf.cheese.common.domain.mapper.CommentMapper;
import com.sirleaf.cheese.web.dao.WebCommentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebCommentDaoImpl implements WebCommentDao {

    @Autowired
    private CommentMapper commentMapper;

    @Override
    public int insertComment(CommentDO commentDO) {
        return commentMapper.insert(commentDO);
    }

    @Override
    public IPage<CommentDO> queryCommentPageListByArticleId(Long current, Long size, Long articleId) {
        Page<CommentDO> page = new Page<>(current, size);
        QueryWrapper<CommentDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(CommentDO::getArticleId, articleId)
                .eq(CommentDO::getStatus, 1)
                .orderByDesc(CommentDO::getCreateTime);
        return commentMapper.selectPage(page, wrapper);
    }
}
