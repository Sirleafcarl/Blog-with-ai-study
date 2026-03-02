package com.quanxiaoha.weblog.admin.service;

import com.quanxiaoha.weblog.admin.model.vo.comment.DeleteCommentReqVO;
import com.quanxiaoha.weblog.admin.model.vo.comment.QueryAdminCommentPageListReqVO;
import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.Response;

public interface AdminCommentService {
    PageResponse queryCommentPageList(QueryAdminCommentPageListReqVO reqVO);

    Response deleteComment(DeleteCommentReqVO reqVO);
}
