package com.sirleaf.cheese.admin.dao;

import com.sirleaf.cheese.common.domain.dos.CategoryDO;

import java.util.List;

public interface AdminCategoryDao {
    List<CategoryDO> selectAllCategory();

    Long selectTotalCount();
}
