package com.sirleaf.cheese.admin.dao;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sirleaf.cheese.common.domain.dos.CommentDO;

public interface AdminCommentDao {
    Page<CommentDO> queryCommentPageList(Long current, Long size, String nickname, Long articleId);

    int deleteById(Long id);
}
