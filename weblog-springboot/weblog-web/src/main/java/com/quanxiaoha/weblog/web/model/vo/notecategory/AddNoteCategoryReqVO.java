package com.quanxiaoha.weblog.web.model.vo.notecategory;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class AddNoteCategoryReqVO {

    @NotBlank(message = "分类名称不能为空")
    @Size(max = 60, message = "分类名称最多60个字符")
    private String name;
}
