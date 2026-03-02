package com.quanxiaoha.weblog.web.controller;

import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.aspect.ApiOperationLog;
import com.quanxiaoha.weblog.web.model.vo.article.SearchArticleReqVO;
import com.quanxiaoha.weblog.web.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private ArticleService articleService;

    @PostMapping("/article/list")
    @ApiOperationLog(description = "搜索文章")
    public PageResponse searchArticle(@RequestBody SearchArticleReqVO reqVO) {
        return articleService.searchArticle(reqVO);
    }
}
