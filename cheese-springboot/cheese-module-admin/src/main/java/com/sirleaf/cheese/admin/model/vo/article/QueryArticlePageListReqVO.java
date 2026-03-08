package com.sirleaf.cheese.admin.model.vo.article;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QueryArticlePageListReqVO {
    private Long current = 1L;
    private Long size = 10L;
    private Date startDate;
    private Date endDate;
    private String searchTitle;
    /** null=全部, 1=审核中, 2=已发布, 3=已拒绝 */
    private Integer status;
}
