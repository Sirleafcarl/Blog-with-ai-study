package com.sirleaf.cheese.admin.dao;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sirleaf.cheese.common.domain.dos.UserDO;

public interface AdminUserDao {
    UserDO selectByUsername(String username);

    int updateAdminPassword(UserDO userDO);

    int insertUser(UserDO userDO);

    Page<UserDO> queryUserPageList(Long current, Long size, String searchUsername);

    int updateUserStatus(Long userId, Boolean isDisabled);
}

