package com.sirleaf.cheese.web.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.CategoryDO;


public interface CategoryService extends IService<CategoryDO> {
    Response queryCategoryList();

}
