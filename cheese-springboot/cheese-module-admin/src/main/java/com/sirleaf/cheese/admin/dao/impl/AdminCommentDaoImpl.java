package com.sirleaf.cheese.admin.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sirleaf.cheese.admin.dao.AdminCommentDao;
import com.sirleaf.cheese.common.domain.dos.CommentDO;
import com.sirleaf.cheese.common.domain.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class AdminCommentDaoImpl implements AdminCommentDao {

    @Autowired
    private CommentMapper commentMapper;

    @Override
    public Page<CommentDO> queryCommentPageList(Long current, Long size, String nickname, Long articleId) {
        Page<CommentDO> page = new Page<>(current, size);
        QueryWrapper<CommentDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(articleId != null, CommentDO::getArticleId, articleId)
                .like(StringUtils.hasText(nickname), CommentDO::getNickname, nickname)
                .orderByDesc(CommentDO::getCreateTime);
        return commentMapper.selectPage(page, wrapper);
    }

    @Override
    public int deleteById(Long id) {
        return commentMapper.deleteById(id);
    }
}
