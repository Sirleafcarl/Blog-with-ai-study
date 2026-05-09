package com.sirleaf.cheese.web.model.vo.ai;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AiNoteReqVO {

    @NotNull(message = "笔记ID不能为空")
    private Long noteId;

    private String questionType; //例如：单选题、判断题、简答题、混合题型
    private Integer questionCount; //题目数量
    private String difficulty; //难度
}
