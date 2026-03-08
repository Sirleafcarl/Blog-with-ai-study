package com.sirleaf.cheese.web.controller;

import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import com.sirleaf.cheese.web.model.vo.note.*;
import com.sirleaf.cheese.web.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/note")
public class NoteController {

    @Autowired
    private NoteService noteService;

    /** 创建笔记 */
    @PostMapping("/add")
    @ApiOperationLog(description = "创建笔记")
    public Response createNote(@RequestBody @Validated CreateNoteReqVO reqVO) {
        return noteService.createNote(reqVO);
    }

    /** 修改笔记 */
    @PostMapping("/update")
    @ApiOperationLog(description = "修改笔记")
    public Response updateNote(@RequestBody @Validated UpdateNoteReqVO reqVO) {
        return noteService.updateNote(reqVO);
    }

    /** 删除笔记 */
    @PostMapping("/delete")
    @ApiOperationLog(description = "删除笔记")
    public Response deleteNote(@RequestBody @Validated DeleteNoteReqVO reqVO) {
        return noteService.deleteNote(reqVO);
    }

    /** 获取笔记详情 */
    @PostMapping("/detail")
    @ApiOperationLog(description = "获取笔记详情")
    public Response getNoteDetail(@RequestBody java.util.Map<String, Long> body) {
        Long id = body.get("id");
        return noteService.getNoteDetail(id);
    }

    /** 笔记分页列表 */
    @PostMapping("/list")
    @ApiOperationLog(description = "笔记分页列表")
    public PageResponse listNotes(@RequestBody QueryNotePageListReqVO reqVO) {
        return noteService.listNotes(reqVO);
    }
}
