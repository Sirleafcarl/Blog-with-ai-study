package com.sirleaf.cheese.admin.model.vo.article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuditArticleReqVO {

    @NotNull(message = "文章ID不能为空")
    private Long articleId;

    /**
     * 审核操作: 1=通过(发布), 3=拒绝
     */
    @NotNull(message = "审核操作不能为空")
    private Integer action;

    /**
     * 拒绝原因（action=3 时必填）
     */
    private String rejectReason;
}
