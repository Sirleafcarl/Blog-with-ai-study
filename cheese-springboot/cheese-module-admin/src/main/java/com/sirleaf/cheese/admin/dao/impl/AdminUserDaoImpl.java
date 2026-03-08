package com.sirleaf.cheese.admin.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sirleaf.cheese.admin.dao.AdminUserDao;
import com.sirleaf.cheese.common.domain.dos.UserDO;
import com.sirleaf.cheese.common.domain.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;


@Service
@Slf4j
public class AdminUserDaoImpl implements AdminUserDao {
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDO selectByUsername(String username) {
        QueryWrapper<UserDO> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(UserDO::getUsername, username);
        return userMapper.selectOne(wrapper);
    }

    @Override
    public int updateAdminPassword(UserDO userDO) {
        UpdateWrapper<UserDO> wrapper = new UpdateWrapper<>();
        wrapper.lambda().eq(UserDO::getUsername, "admin");
        return userMapper.update(userDO, wrapper);
    }

    @Override
    public int insertUser(UserDO userDO) {
        return userMapper.insert(userDO);
    }

    @Override
    public Page<UserDO> queryUserPageList(Long current, Long size, String searchUsername) {
        Page<UserDO> page = new Page<>(current, size);
        QueryWrapper<UserDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .like(StringUtils.hasText(searchUsername), UserDO::getUsername, searchUsername)
                .eq(UserDO::getIsDeleted, false)
                .orderByDesc(UserDO::getCreateTime);
        return userMapper.selectPage(page, wrapper);
    }

    @Override
    public int updateUserStatus(Long userId, Boolean isDisabled) {
        UserDO userDO = UserDO.builder()
                .isDisabled(isDisabled)
                .updateTime(new Date())
                .build();
        UpdateWrapper<UserDO> wrapper = new UpdateWrapper<>();
        wrapper.lambda().eq(UserDO::getId, userId);
        return userMapper.update(userDO, wrapper);
    }
}

