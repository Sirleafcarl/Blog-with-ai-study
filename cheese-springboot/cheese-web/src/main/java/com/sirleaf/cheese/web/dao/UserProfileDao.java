package com.sirleaf.cheese.web.dao;

import com.sirleaf.cheese.common.domain.dos.UserDO;

public interface UserProfileDao {
    UserDO selectByUsername(String username);
    int updateProfile(UserDO userDO);
}
