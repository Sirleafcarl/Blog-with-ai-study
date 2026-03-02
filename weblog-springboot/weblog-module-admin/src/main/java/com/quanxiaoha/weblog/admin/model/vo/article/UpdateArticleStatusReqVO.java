package com.quanxiaoha.weblog.admin.model.vo.article;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UpdateArticleStatusReqVO {
    @NotNull(message = "文章 ID 不能为空")
    private Long id;

    private Boolean isTop;

    private Boolean isPublished;
}
