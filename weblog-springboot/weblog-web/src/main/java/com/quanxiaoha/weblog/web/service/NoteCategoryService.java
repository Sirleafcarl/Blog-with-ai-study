package com.quanxiaoha.weblog.web.service;

import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.web.model.vo.notecategory.AddNoteCategoryReqVO;
import com.quanxiaoha.weblog.web.model.vo.notecategory.DeleteNoteCategoryReqVO;

public interface NoteCategoryService {

    Response addCategory(AddNoteCategoryReqVO reqVO);

    Response deleteCategory(DeleteNoteCategoryReqVO reqVO);

    Response listCategories();
}
