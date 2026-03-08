package com.sirleaf.cheese.web.service;

import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.web.model.vo.comment.PostCommentReqVO;
import com.sirleaf.cheese.web.model.vo.comment.QueryCommentPageListReqVO;

public interface CommentService {
    Response postComment(PostCommentReqVO reqVO);

    PageResponse queryCommentPageList(QueryCommentPageListReqVO reqVO);
}
