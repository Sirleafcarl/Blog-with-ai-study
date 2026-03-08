package com.sirleaf.cheese.web.controller;

import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import com.sirleaf.cheese.web.model.vo.article.QueryCategoryArticlePageListReqVO;
import com.sirleaf.cheese.web.service.ArticleService;
import com.sirleaf.cheese.web.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ArticleService articleService;

    @PostMapping("/list")
    @ApiOperationLog(description = "获取所有分类数据")
    public Response queryCategoryList() {
        return categoryService.queryCategoryList();
    }

    @PostMapping("/article/list")
    @ApiOperationLog(description = "获取所属分类的文章分页数据")
    public PageResponse queryArticlePageList(@RequestBody @Validated QueryCategoryArticlePageListReqVO queryCategoryArticlePageListReqVO) {
        return articleService.queryCategoryArticlePageList(queryCategoryArticlePageListReqVO);
    }


}
