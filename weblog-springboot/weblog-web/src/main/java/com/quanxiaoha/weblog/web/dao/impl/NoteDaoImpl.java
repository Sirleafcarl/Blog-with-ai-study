package com.quanxiaoha.weblog.web.dao.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.quanxiaoha.weblog.common.domain.dos.NoteDO;
import com.quanxiaoha.weblog.common.domain.mapper.NoteMapper;
import com.quanxiaoha.weblog.web.dao.NoteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class NoteDaoImpl implements NoteDao {

    @Autowired
    private NoteMapper noteMapper;

    @Override
    public int insertNote(NoteDO noteDO) {
        return noteMapper.insert(noteDO);
    }

    @Override
    public int updateNote(NoteDO noteDO) {
        return noteMapper.updateById(noteDO);
    }

    @Override
    public int deleteById(Long id, String username) {
        UpdateWrapper<NoteDO> wrapper = new UpdateWrapper<>();
        wrapper.lambda()
                .set(NoteDO::getIsDeleted, true)
                .eq(NoteDO::getId, id)
                .eq(NoteDO::getUsername, username);
        return noteMapper.update(null, wrapper);
    }

    @Override
    public NoteDO queryById(Long id, String username) {
        QueryWrapper<NoteDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(NoteDO::getId, id)
                .eq(NoteDO::getUsername, username)
                .eq(NoteDO::getIsDeleted, false);
        return noteMapper.selectOne(wrapper);
    }

    @Override
    public IPage<NoteDO> queryPageList(long current, long size, String username, String keyword, Long categoryId) {
        Page<NoteDO> page = new Page<>(current, size);
        QueryWrapper<NoteDO> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(NoteDO::getUsername, username)
                .eq(NoteDO::getIsDeleted, false)
                .eq(Objects.nonNull(categoryId), NoteDO::getCategoryId, categoryId)
                .like(Objects.nonNull(keyword) && !keyword.isEmpty(), NoteDO::getTitle, keyword)
                .orderByDesc(NoteDO::getUpdateTime);
        return noteMapper.selectPage(page, wrapper);
    }
}
