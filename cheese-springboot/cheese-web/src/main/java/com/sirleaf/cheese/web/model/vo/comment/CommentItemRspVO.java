package com.sirleaf.cheese.web.model.vo.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentItemRspVO {
    private Long id;
    private String nickname;
    private String content;
    private String createTime;
}
