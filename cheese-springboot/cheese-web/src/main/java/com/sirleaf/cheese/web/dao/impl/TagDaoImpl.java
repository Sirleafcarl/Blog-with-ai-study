package com.sirleaf.cheese.web.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sirleaf.cheese.common.domain.mapper.TagMapper;
import com.sirleaf.cheese.common.domain.dos.TagDO;
import com.sirleaf.cheese.web.dao.TagDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class TagDaoImpl implements TagDao {

    @Autowired
    private TagMapper tagMapper;

    @Override
    public List<TagDO> selectAllTag() {
        return tagMapper.selectList(null);
    }

    @Override
    public List<TagDO> selectByTagIds(List<Long> tagIds) {
        QueryWrapper<TagDO> wrapper = new QueryWrapper<>();
        wrapper.lambda().in(TagDO::getId, tagIds);
        return tagMapper.selectList(wrapper);
    }
}
