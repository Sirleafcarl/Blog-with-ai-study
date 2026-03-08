package com.sirleaf.cheese.admin.controller;

import com.sirleaf.cheese.admin.model.vo.article.*;
import com.sirleaf.cheese.admin.service.AdminArticleService;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/admin/article")
public class AdminArticleController {

    @Autowired
    private AdminArticleService articleService;

    @PostMapping("/publish")
    @ApiOperationLog(description = "发布文章")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Response publishArticle(@RequestBody @Validated PublishArticleReqVO publishArticleReqVO) {
        return articleService.publishArticle(publishArticleReqVO);
    }

    @PostMapping("/update")
    @ApiOperationLog(description = "修改文章")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Response updateArticle(@RequestBody @Validated UpdateArticleReqVO updateArticleReqVO) {
        return articleService.updateArticle(updateArticleReqVO);
    }

    @PostMapping("/detail")
    @ApiOperationLog(description = "获取文章详情")
    public Response queryArticleDetail(@RequestBody QueryArticleDetailReqVO queryArticleDetailReqVO) {
        return articleService.queryArticleDetail(queryArticleDetailReqVO);
    }

    @PostMapping("/list")
    @ApiOperationLog(description = "获取文章分页数据")
    public Response queryArticlePageList(@RequestBody QueryArticlePageListReqVO queryArticlePageListReqVO) {
        return articleService.queryArticlePageList(queryArticlePageListReqVO);
    }

    @PostMapping("/delete")
    @ApiOperationLog(description = "删除文章")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Response deleteArticle(@RequestBody @Validated DeleteArticleReqVO deleteArticleReqVO) {
        return articleService.deleteArticle(deleteArticleReqVO);
    }

    @PostMapping("/updateStatus")
    @ApiOperationLog(description = "更新文章置顶/发布状态")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Response updateArticleStatus(@RequestBody @Validated UpdateArticleStatusReqVO reqVO) {
        return articleService.updateArticleTopOrPublished(reqVO);
    }

    @PostMapping("/audit")
    @ApiOperationLog(description = "审核用户投稿文章")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Response auditArticle(@RequestBody @Validated AuditArticleReqVO reqVO) {
        return articleService.auditArticle(reqVO);
    }

}
