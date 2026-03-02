package com.quanxiaoha.weblog.web.service;

import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.web.model.vo.comment.PostCommentReqVO;
import com.quanxiaoha.weblog.web.model.vo.comment.QueryCommentPageListReqVO;

public interface CommentService {
    Response postComment(PostCommentReqVO reqVO);

    PageResponse queryCommentPageList(QueryCommentPageListReqVO reqVO);
}
