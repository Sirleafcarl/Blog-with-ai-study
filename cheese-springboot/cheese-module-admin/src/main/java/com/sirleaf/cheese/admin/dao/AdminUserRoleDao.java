package com.sirleaf.cheese.admin.dao;


import com.sirleaf.cheese.common.domain.dos.UserRoleDO;

import java.util.List;

public interface AdminUserRoleDao {
    List<UserRoleDO> selectByUsername(String username);
}
