package com.sirleaf.cheese.web.model.vo.article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchArticleReqVO {
    /** 搜索关键词 */
    private String keyword;
    private Long current = 1L;
    private Long size = 10L;
}
