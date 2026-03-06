package com.quanxiaoha.weblog.web.model.vo.note;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteDetailRspVO {
    private Long id;
    private String title;
    private String content;
    private Long categoryId;
    private String categoryName;
    private String createTime;
    private String updateTime;
}
