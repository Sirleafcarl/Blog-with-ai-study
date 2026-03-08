package com.sirleaf.cheese.web.controller;

import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import com.sirleaf.cheese.web.model.vo.article.QueryTagArticlePageListReqVO;
import com.sirleaf.cheese.web.service.ArticleService;
import com.sirleaf.cheese.web.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/tag")
public class TagController {

    @Autowired
    private TagService tagService;
    @Autowired
    private ArticleService articleService;

    @PostMapping("/list")
    @ApiOperationLog(description = "获取所有标签数据")
    public Response queryTagList() {
        return tagService.queryTagList();
    }

    @PostMapping("/article/list")
    @ApiOperationLog(description = "获取所属标签的文章分页数据")
    public PageResponse queryArticlePageList(@RequestBody @Validated QueryTagArticlePageListReqVO queryTagArticlePageListReqVO) {
        return articleService.queryTagArticlePageList(queryTagArticlePageListReqVO);
    }
}
