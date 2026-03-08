package com.sirleaf.cheese.web.controller;

import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import com.sirleaf.cheese.web.model.vo.article.QueryArticleDetailReqVO;
import com.sirleaf.cheese.web.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PostMapping("/detail")
    @ApiOperationLog(description = "获取文章详情信息")
    public Response queryArticleDetail(@RequestBody @Validated QueryArticleDetailReqVO queryArticleDetailReqVO) {
        return articleService.queryArticleDetail(queryArticleDetailReqVO);
    }
}
