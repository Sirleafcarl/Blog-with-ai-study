package com.quanxiaoha.weblog.admin.model.vo.user;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UpdateUserStatusReqVO {
    @NotNull(message = "用户ID不能为空")
    private Long userId;
    @NotNull(message = "禁用状态不能为空")
    private Boolean isDisabled;
}
