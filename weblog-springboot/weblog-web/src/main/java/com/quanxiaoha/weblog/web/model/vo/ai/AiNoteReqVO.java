package com.quanxiaoha.weblog.web.model.vo.ai;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AiNoteReqVO {

    @NotNull(message = "笔记ID不能为空")
    private Long noteId;
}
