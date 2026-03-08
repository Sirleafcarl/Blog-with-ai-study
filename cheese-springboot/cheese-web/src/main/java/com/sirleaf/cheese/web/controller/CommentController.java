package com.sirleaf.cheese.web.controller;

import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import com.sirleaf.cheese.web.model.vo.comment.PostCommentReqVO;
import com.sirleaf.cheese.web.model.vo.comment.QueryCommentPageListReqVO;
import com.sirleaf.cheese.web.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/post")
    @ApiOperationLog(description = "发表评论")
    @PreAuthorize("isAuthenticated()")
    public Response postComment(@RequestBody @Validated PostCommentReqVO reqVO) {
        return commentService.postComment(reqVO);
    }

    @PostMapping("/list")
    @ApiOperationLog(description = "获取文章评论列表")
    public PageResponse queryCommentPageList(@RequestBody QueryCommentPageListReqVO reqVO) {
        return commentService.queryCommentPageList(reqVO);
    }
}
