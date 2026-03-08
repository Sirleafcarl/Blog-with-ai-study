package com.sirleaf.cheese.web.dao;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sirleaf.cheese.common.domain.dos.NoteDO;

public interface NoteDao {

    int insertNote(NoteDO noteDO);

    int updateNote(NoteDO noteDO);

    int deleteById(Long id, String username);

    NoteDO queryById(Long id, String username);

    IPage<NoteDO> queryPageList(long current, long size, String username, String keyword, Long categoryId);
}
