package com.sirleaf.cheese.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sirleaf.cheese.common.domain.dos.CategoryDO;
import com.sirleaf.cheese.admin.model.vo.category.AddCategoryReqVO;
import com.sirleaf.cheese.admin.model.vo.category.DeleteCategoryReqVO;
import com.sirleaf.cheese.admin.model.vo.category.QueryCategoryPageListReqVO;
import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;


public interface AdminCategoryService extends IService<CategoryDO> {
    Response addCategory(AddCategoryReqVO addCategoryReqVO);

    PageResponse queryCategoryPageList(QueryCategoryPageListReqVO queryCategoryPageListReqVO);

    Response deleteCategory(DeleteCategoryReqVO deleteCategoryReqVO);

    Response queryCategorySelectList();
}
