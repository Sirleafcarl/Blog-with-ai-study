package com.quanxiaoha.weblog.admin.model.vo.comment;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class DeleteCommentReqVO {
    @NotNull(message = "评论id不能为空")
    private Long id;
}
