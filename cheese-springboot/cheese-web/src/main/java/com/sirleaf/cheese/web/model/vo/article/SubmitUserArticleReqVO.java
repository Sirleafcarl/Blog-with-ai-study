package com.sirleaf.cheese.web.model.vo.article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubmitUserArticleReqVO {

    @NotBlank(message = "文章标题不能为空")
    @Length(min = 1, max = 40, message = "文章标题字数需大于 1 小于 40")
    private String title;

    @NotBlank(message = "文章内容不能为空")
    private String content;

    private String titleImage;

    @NotBlank(message = "文章摘要不能为空")
    private String description;

    @NotNull(message = "文章分类不能为空")
    private Long categoryId;

    private List<String> tags;

    /**
     * true = 仅保存为草稿(status=0)，false/null = 提交审核(status=1)
     */
    private Boolean isDraft = false;
}
