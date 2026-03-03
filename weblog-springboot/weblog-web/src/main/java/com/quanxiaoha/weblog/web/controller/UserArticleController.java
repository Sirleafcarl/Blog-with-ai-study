package com.quanxiaoha.weblog.web.controller;

import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.aspect.ApiOperationLog;
import com.quanxiaoha.weblog.web.model.vo.article.QueryUserArticlePageListReqVO;
import com.quanxiaoha.weblog.web.model.vo.article.SubmitUserArticleReqVO;
import com.quanxiaoha.weblog.web.model.vo.article.UpdateUserArticleReqVO;
import com.quanxiaoha.weblog.web.service.UserArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/article")
public class UserArticleController {

    @Autowired
    private UserArticleService userArticleService;

    @PostMapping("/submit")
    @ApiOperationLog(description = "用户投稿/保存草稿")
    public Response submitArticle(@RequestBody @Validated SubmitUserArticleReqVO reqVO) {
        return userArticleService.submitArticle(reqVO);
    }

    @PostMapping("/update")
    @ApiOperationLog(description = "用户修改文章")
    public Response updateArticle(@RequestBody @Validated UpdateUserArticleReqVO reqVO) {
        return userArticleService.updateArticle(reqVO);
    }

    @PostMapping("/delete")
    @ApiOperationLog(description = "用户删除文章")
    public Response deleteArticle(@RequestBody @Validated DeleteArticleIdReqVO reqVO) {
        return userArticleService.deleteArticle(reqVO.getArticleId());
    }

    @PostMapping("/list")
    @ApiOperationLog(description = "获取我的文章列表")
    public Response getMyArticleList(@RequestBody QueryUserArticlePageListReqVO reqVO) {
        return userArticleService.getMyArticleList(reqVO);
    }

    @PostMapping("/detail")
    @ApiOperationLog(description = "获取我的文章详情")
    public Response getMyArticleDetail(@RequestBody DeleteArticleIdReqVO reqVO) {
        return userArticleService.getMyArticleDetail(reqVO.getArticleId());
    }

    // Inline lightweight VO to avoid creating a separate file for just an ID
    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class DeleteArticleIdReqVO {
        @javax.validation.constraints.NotNull(message = "文章ID不能为空")
        private Long articleId;
    }
}
