package com.quanxiaoha.weblog.web.model.vo.note;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteItemRspVO {
    private Long id;
    private String title;
    /** 内容摘要（前100字） */
    private String summary;
    private String createTime;
    private String updateTime;
}
