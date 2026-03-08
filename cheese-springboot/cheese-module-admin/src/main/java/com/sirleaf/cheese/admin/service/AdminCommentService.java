package com.sirleaf.cheese.admin.service;

import com.sirleaf.cheese.admin.model.vo.comment.DeleteCommentReqVO;
import com.sirleaf.cheese.admin.model.vo.comment.QueryAdminCommentPageListReqVO;
import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;

public interface AdminCommentService {
    PageResponse queryCommentPageList(QueryAdminCommentPageListReqVO reqVO);

    Response deleteComment(DeleteCommentReqVO reqVO);
}
