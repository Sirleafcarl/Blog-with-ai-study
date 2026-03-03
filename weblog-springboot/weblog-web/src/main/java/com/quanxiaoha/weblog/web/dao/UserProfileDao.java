package com.quanxiaoha.weblog.web.dao;

import com.quanxiaoha.weblog.common.domain.dos.UserDO;

public interface UserProfileDao {
    UserDO selectByUsername(String username);
    int updateProfile(UserDO userDO);
}
