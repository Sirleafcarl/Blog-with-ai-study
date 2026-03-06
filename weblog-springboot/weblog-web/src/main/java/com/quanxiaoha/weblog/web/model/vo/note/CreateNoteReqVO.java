package com.quanxiaoha.weblog.web.model.vo.note;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CreateNoteReqVO {

    @NotBlank(message = "笔记标题不能为空")
    @Size(max = 200, message = "标题最多200个字符")
    private String title;

    @Size(max = 100000, message = "内容过长")
    private String content;

    /** 笔记分类id（可选） */
    private Long categoryId;
}
