package com.quanxiaoha.weblog.web.model.vo.article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QueryUserArticlePageListReqVO {
    private Long current = 1L;
    private Long size = 10L;
    /** null=全部, 0=草稿, 1=审核中, 2=已发布, 3=已拒绝 */
    private Integer status;
}
