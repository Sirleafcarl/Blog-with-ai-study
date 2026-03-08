package com.sirleaf.cheese.admin.model.vo.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminCommentItemRspVO {
    private Long id;
    private Long articleId;
    private String articleTitle;
    private String nickname;
    private String email;
    private String content;
    private Integer status;
    private String createTime;
}
