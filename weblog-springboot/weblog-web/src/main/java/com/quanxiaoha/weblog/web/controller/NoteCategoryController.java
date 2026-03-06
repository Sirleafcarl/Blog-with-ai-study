package com.quanxiaoha.weblog.web.controller;

import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.aspect.ApiOperationLog;
import com.quanxiaoha.weblog.web.model.vo.notecategory.AddNoteCategoryReqVO;
import com.quanxiaoha.weblog.web.model.vo.notecategory.DeleteNoteCategoryReqVO;
import com.quanxiaoha.weblog.web.service.NoteCategoryService;
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
