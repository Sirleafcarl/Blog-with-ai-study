package com.sirleaf.cheese.web.model.vo.user;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class UpdateUserPasswordReqVO {
    @NotBlank(message = "原密码不能为空")
    private String oldPassword;

    @NotBlank(message = "新密码不能为空")
    @Size(min = 6, max = 60, message = "新密码长度为6-60个字符")
    private String newPassword;
}
