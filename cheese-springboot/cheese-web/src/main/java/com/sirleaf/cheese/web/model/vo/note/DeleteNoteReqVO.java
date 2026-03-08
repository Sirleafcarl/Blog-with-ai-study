package com.sirleaf.cheese.web.model.vo.note;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class DeleteNoteReqVO {
    @NotNull(message = "笔记id不能为空")
    private Long id;
}
