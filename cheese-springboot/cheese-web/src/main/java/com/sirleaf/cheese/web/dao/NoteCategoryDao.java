package com.sirleaf.cheese.web.dao;

import com.sirleaf.cheese.common.domain.dos.NoteCategoryDO;

import java.util.List;

public interface NoteCategoryDao {

    int insert(NoteCategoryDO noteCategoryDO);

    int deleteById(Long id, String username);

    NoteCategoryDO queryById(Long id, String username);

    List<NoteCategoryDO> queryListByUsername(String username);
}
