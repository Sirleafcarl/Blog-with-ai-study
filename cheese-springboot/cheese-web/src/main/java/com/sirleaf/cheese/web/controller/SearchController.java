package com.sirleaf.cheese.web.controller;

import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import com.sirleaf.cheese.web.model.vo.article.SearchArticleReqVO;
import com.sirleaf.cheese.web.service.ArticleService;
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
