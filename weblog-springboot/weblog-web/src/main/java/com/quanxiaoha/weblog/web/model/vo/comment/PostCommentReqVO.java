package com.quanxiaoha.weblog.web.model.vo.comment;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class PostCommentReqVO {
    @NotNull(message = "文章id不能为空")
    private Long articleId;

    @NotBlank(message = "昵称不能为空")
    @Size(max = 20, message = "昵称最多20个字符")
    private String nickname;

    @Size(max = 100, message = "邮箱最多100个字符")
    private String email;

    @NotBlank(message = "评论内容不能为空")
    @Size(max = 500, message = "评论内容最多500个字符")
    private String content;
}
