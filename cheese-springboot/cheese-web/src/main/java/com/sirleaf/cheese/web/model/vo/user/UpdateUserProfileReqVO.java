package com.sirleaf.cheese.web.model.vo.user;

import lombok.Data;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
public class UpdateUserProfileReqVO {
    @Size(max = 60, message = "昵称不能超过60个字符")
    private String nickname;

    @Size(max = 256, message = "头像URL不能超过256个字符")
    private String avatar;

    @Email(message = "邮箱格式不正确")
    @Size(max = 128, message = "邮箱不能超过128个字符")
    private String email;

    @Size(max = 256, message = "个人简介不能超过256个字符")
    private String bio;
}
