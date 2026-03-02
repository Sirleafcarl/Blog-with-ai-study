package com.quanxiaoha.weblog.web.dao;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.quanxiaoha.weblog.common.domain.dos.CommentDO;

public interface WebCommentDao {
    int insertComment(CommentDO commentDO);

    IPage<CommentDO> queryCommentPageListByArticleId(Long current, Long size, Long articleId);
}
