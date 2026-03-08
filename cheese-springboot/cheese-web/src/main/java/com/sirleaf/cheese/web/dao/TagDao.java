package com.sirleaf.cheese.web.dao;

import com.sirleaf.cheese.common.domain.dos.TagDO;

import java.util.List;

public interface TagDao {
    List<TagDO> selectAllTag();

    List<TagDO> selectByTagIds(List<Long> tagIds);
}
