package com.quanxiaoha.weblog.web.service;

import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.web.model.vo.note.*;

public interface NoteService {

    Response createNote(CreateNoteReqVO reqVO);

    Response updateNote(UpdateNoteReqVO reqVO);

    Response deleteNote(DeleteNoteReqVO reqVO);

    Response getNoteDetail(Long id);

    PageResponse listNotes(QueryNotePageListReqVO reqVO);
}
