package com.sirleaf.cheese.web.controller;

import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import com.sirleaf.cheese.web.model.vo.notecategory.AddNoteCategoryReqVO;
import com.sirleaf.cheese.web.model.vo.notecategory.DeleteNoteCategoryReqVO;
import com.sirleaf.cheese.web.service.NoteCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/note-category")
public class NoteCategoryController {

    @Autowired
    private NoteCategoryService noteCategoryService;

    @PostMapping("/add")
    @ApiOperationLog(description = "新增笔记分类")
    public Response addCategory(@RequestBody @Validated AddNoteCategoryReqVO reqVO) {
        return noteCategoryService.addCategory(reqVO);
    }

    @PostMapping("/delete")
    @ApiOperationLog(description = "删除笔记分类")
    public Response deleteCategory(@RequestBody @Validated DeleteNoteCategoryReqVO reqVO) {
        return noteCategoryService.deleteCategory(reqVO);
    }

    @PostMapping("/list")
    @ApiOperationLog(description = "笔记分类列表")
    public Response listCategories() {
        return noteCategoryService.listCategories();
    }
}
