package com.quanxiaoha.weblog.admin.controller;

import com.quanxiaoha.weblog.admin.model.vo.comment.DeleteCommentReqVO;
import com.quanxiaoha.weblog.admin.model.vo.comment.QueryAdminCommentPageListReqVO;
import com.quanxiaoha.weblog.admin.service.AdminCommentService;
import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.aspect.ApiOperationLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/comment")
public class AdminCommentController {

    @Autowired
    private AdminCommentService commentService;

    @PostMapping("/list")
    @ApiOperationLog(description = "获取评论分页列表")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public PageResponse queryCommentPageList(@RequestBody QueryAdminCommentPageListReqVO reqVO) {
        return commentService.queryCommentPageList(reqVO);
    }

    @PostMapping("/delete")
    @ApiOperationLog(description = "删除评论")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Response deleteComment(@RequestBody @Validated DeleteCommentReqVO reqVO) {
        return commentService.deleteComment(reqVO);
    }
}
