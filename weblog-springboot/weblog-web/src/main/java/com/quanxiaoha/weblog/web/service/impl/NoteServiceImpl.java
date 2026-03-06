package com.quanxiaoha.weblog.web.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.NoteCategoryDO;
import com.quanxiaoha.weblog.common.domain.dos.NoteDO;
import com.quanxiaoha.weblog.web.dao.NoteCategoryDao;
import com.quanxiaoha.weblog.web.dao.NoteDao;
import com.quanxiaoha.weblog.web.model.vo.note.*;
import com.quanxiaoha.weblog.web.service.NoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NoteServiceImpl implements NoteService {

    private static final SimpleDateFormat DATETIME_FMT = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    @Autowired
    private NoteDao noteDao;

    @Autowired
    private NoteCategoryDao noteCategoryDao;

    /** 获取当前登录用户名 */
    private String currentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    @Override
    public Response createNote(CreateNoteReqVO reqVO) {
        String username = currentUsername();
        NoteDO noteDO = NoteDO.builder()
                .username(username)
                .title(reqVO.getTitle())
                .content(reqVO.getContent() == null ? "" : reqVO.getContent())
                .categoryId(reqVO.getCategoryId())
                .isDeleted(false)
                .createTime(new Date())
                .updateTime(new Date())
                .build();
        noteDao.insertNote(noteDO);
        log.info("==> 用户 {} 创建笔记, id: {}", username, noteDO.getId());
        return Response.success(noteDO.getId());
    }

    @Override
    public Response updateNote(UpdateNoteReqVO reqVO) {
        String username = currentUsername();
        // 权限校验：只能修改自己的笔记
        NoteDO exist = noteDao.queryById(reqVO.getId(), username);
        if (exist == null) {
            return Response.fail("笔记不存在或无权修改");
        }
        NoteDO noteDO = NoteDO.builder()
                .id(reqVO.getId())
                .title(reqVO.getTitle())
                .content(reqVO.getContent() == null ? "" : reqVO.getContent())
                .categoryId(reqVO.getCategoryId())
                .updateTime(new Date())
                .build();
        noteDao.updateNote(noteDO);
        return Response.success();
    }

    @Override
    public Response deleteNote(DeleteNoteReqVO reqVO) {
        String username = currentUsername();
        NoteDO exist = noteDao.queryById(reqVO.getId(), username);
        if (exist == null) {
            return Response.fail("笔记不存在或无权删除");
        }
        noteDao.deleteById(reqVO.getId(), username);
        return Response.success();
    }

    @Override
    public Response getNoteDetail(Long id) {
        String username = currentUsername();
        NoteDO note = noteDao.queryById(id, username);
        if (note == null) {
            return Response.fail("笔记不存在");
        }
        // 查询分类名称
        String categoryName = null;
        if (note.getCategoryId() != null) {
            NoteCategoryDO cat = noteCategoryDao.queryById(note.getCategoryId(), username);
            if (cat != null) categoryName = cat.getName();
        }
        NoteDetailRspVO vo = NoteDetailRspVO.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .categoryId(note.getCategoryId())
                .categoryName(categoryName)
                .createTime(DATETIME_FMT.format(note.getCreateTime()))
                .updateTime(DATETIME_FMT.format(note.getUpdateTime()))
                .build();
        return Response.success(vo);
    }

    @Override
    public PageResponse listNotes(QueryNotePageListReqVO reqVO) {
        String username = currentUsername();
        IPage<NoteDO> page = noteDao.queryPageList(
                reqVO.getCurrent(), reqVO.getSize(), username, reqVO.getKeyword(), reqVO.getCategoryId());

        // 批量查询分类名称
        List<NoteCategoryDO> categories = noteCategoryDao.queryListByUsername(username);
        Map<Long, String> categoryMap = categories.stream()
                .collect(Collectors.toMap(NoteCategoryDO::getId, NoteCategoryDO::getName));

        List<NoteItemRspVO> list = page.getRecords().stream().map(n -> {
            String content = n.getContent() == null ? "" : n.getContent();
            String summary = content.length() > 100 ? content.substring(0, 100) + "..." : content;
            return NoteItemRspVO.builder()
                    .id(n.getId())
                    .title(n.getTitle())
                    .summary(summary)
                    .categoryId(n.getCategoryId())
                    .categoryName(n.getCategoryId() != null ? categoryMap.get(n.getCategoryId()) : null)
                    .createTime(DATETIME_FMT.format(n.getCreateTime()))
                    .updateTime(DATETIME_FMT.format(n.getUpdateTime()))
                    .build();
        }).collect(Collectors.toList());

        return PageResponse.success(page, list);
    }
}
