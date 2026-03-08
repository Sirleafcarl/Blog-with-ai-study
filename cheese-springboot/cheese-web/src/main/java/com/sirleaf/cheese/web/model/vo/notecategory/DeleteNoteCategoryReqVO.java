package com.sirleaf.cheese.web.model.vo.notecategory;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class DeleteNoteCategoryReqVO {
    @NotNull(message = "分类id不能为空")
    private Long id;
}
