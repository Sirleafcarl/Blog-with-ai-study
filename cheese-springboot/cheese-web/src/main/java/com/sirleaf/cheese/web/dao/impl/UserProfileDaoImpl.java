package com.sirleaf.cheese.web.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.sirleaf.cheese.common.domain.dos.UserDO;
import com.sirleaf.cheese.common.domain.mapper.UserMapper;
import com.sirleaf.cheese.web.dao.UserProfileDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserProfileDaoImpl implements UserProfileDao {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDO selectByUsername(String username) {
        QueryWrapper<UserDO> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(UserDO::getUsername, username);
        return userMapper.selectOne(wrapper);
    }

    @Override
    public int updateProfile(UserDO userDO) {
        UpdateWrapper<UserDO> wrapper = new UpdateWrapper<>();
        wrapper.lambda().eq(UserDO::getUsername, userDO.getUsername());
        return userMapper.update(userDO, wrapper);
    }
}
