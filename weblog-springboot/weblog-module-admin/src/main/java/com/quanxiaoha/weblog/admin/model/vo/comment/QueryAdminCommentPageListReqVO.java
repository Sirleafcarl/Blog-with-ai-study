package com.quanxiaoha.weblog.admin.model.vo.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QueryAdminCommentPageListReqVO {
    private Long current = 1L;
    private Long size = 10L;
    /** 按昵称模糊搜索（可选） */
    private String nickname;
    /** 按文章id筛选（可选） */
    private Long articleId;
}
