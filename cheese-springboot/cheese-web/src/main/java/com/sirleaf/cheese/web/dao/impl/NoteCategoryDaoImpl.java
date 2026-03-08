package com.sirleaf.cheese.web.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.sirleaf.cheese.common.domain.dos.NoteCategoryDO;
import com.sirleaf.cheese.common.domain.mapper.NoteCategoryMapper;
import com.sirleaf.cheese.web.dao.NoteCategoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteCategoryDaoImpl implements NoteCategoryDao {

    @Autowired
    private NoteCategoryMapper noteCategoryMapper;

    @Override
    public int insert(NoteCategoryDO noteCategoryDO) {
        return noteCategoryMapper.insert(noteCategoryDO);
    }

    @Override
    public int deleteById(Long id, String username) {
        UpdateWrapper<NoteCategoryDO> wrapper = new UpdateWrapper<>();
        wrapper.lambda()
                .set(NoteCategoryDO::getIsDeleted, true)
                .eq(NoteCategoryDO::getId, id)
                .eq(NoteCategoryDO::getUsername, username);
        return noteCategoryMapper.update(null, wrapper);
    }

    @Override
    public NoteCategoryDO queryById(Long id, String username) {
        QueryWrapper<NoteCategoryDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(NoteCategoryDO::getId, id)
                .eq(NoteCategoryDO::getUsername, username)
                .eq(NoteCategoryDO::getIsDeleted, false);
        return noteCategoryMapper.selectOne(wrapper);
    }

    @Override
    public List<NoteCategoryDO> queryListByUsername(String username) {
        QueryWrapper<NoteCategoryDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(NoteCategoryDO::getUsername, username)
                .eq(NoteCategoryDO::getIsDeleted, false)
                .orderByDesc(NoteCategoryDO::getCreateTime);
        return noteCategoryMapper.selectList(wrapper);
    }
}
