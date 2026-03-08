package com.sirleaf.cheese.web.service;

import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.web.model.vo.note.*;

public interface NoteService {

    Response createNote(CreateNoteReqVO reqVO);

    Response updateNote(UpdateNoteReqVO reqVO);

    Response deleteNote(DeleteNoteReqVO reqVO);

    Response getNoteDetail(Long id);

    PageResponse listNotes(QueryNotePageListReqVO reqVO);
}
