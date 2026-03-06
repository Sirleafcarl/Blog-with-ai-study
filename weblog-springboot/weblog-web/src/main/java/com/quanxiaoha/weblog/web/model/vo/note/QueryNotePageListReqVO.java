package com.quanxiaoha.weblog.web.model.vo.note;

import lombok.Data;

@Data
public class QueryNotePageListReqVO {
    private Long current = 1L;
    private Long size = 10L;
    /** 搜索关键词（标题模糊） */
    private String keyword;
    /** 分类id筛选 */
    private Long categoryId;
}
