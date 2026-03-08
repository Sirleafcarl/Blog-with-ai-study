package com.sirleaf.cheese.web.service;

import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.web.model.vo.notecategory.AddNoteCategoryReqVO;
import com.sirleaf.cheese.web.model.vo.notecategory.DeleteNoteCategoryReqVO;

public interface NoteCategoryService {

    Response addCategory(AddNoteCategoryReqVO reqVO);

    Response deleteCategory(DeleteNoteCategoryReqVO reqVO);

    Response listCategories();
}
