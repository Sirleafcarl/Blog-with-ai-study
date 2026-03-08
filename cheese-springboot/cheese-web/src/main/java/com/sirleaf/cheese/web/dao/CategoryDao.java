package com.sirleaf.cheese.web.dao;

import com.sirleaf.cheese.common.domain.dos.CategoryDO;

import java.util.List;

public interface CategoryDao {
    List<CategoryDO> selectAllCategory();

    CategoryDO selectByCategoryId(Long categoryId);
}
