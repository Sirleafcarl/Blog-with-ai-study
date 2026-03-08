package com.sirleaf.cheese.admin.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sirleaf.cheese.admin.dao.AdminCategoryDao;
import com.sirleaf.cheese.common.domain.mapper.CategoryMapper;
import com.sirleaf.cheese.common.domain.dos.CategoryDO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class AdminCategoryDaoImpl implements AdminCategoryDao {
    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public List<CategoryDO> selectAllCategory() {
        return categoryMapper.selectList(null);
    }

    @Override
    public Long selectTotalCount() {
        QueryWrapper<CategoryDO> wrapper = new QueryWrapper<>();
        wrapper.select("1").lambda().eq(CategoryDO::getIsDeleted, 0);
        return categoryMapper.selectCount(wrapper);
    }
}
