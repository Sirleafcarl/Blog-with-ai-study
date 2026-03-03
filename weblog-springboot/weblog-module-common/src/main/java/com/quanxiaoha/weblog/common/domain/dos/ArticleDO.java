package com.quanxiaoha.weblog.common.domain.dos;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_article")
public class ArticleDO {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String title;
    private String titleImage;
    private String description;
    private Date createTime;
    private Date updateTime;
    private Boolean isDeleted;
    private Long readNum;
    private Boolean isTop;
    private Boolean isPublished;
    /** 投稿用户名，NULL 表示管理员发布 */
    private String authorUsername;
    /** 文章状态: 0=草稿 1=审核中 2=已发布 3=已拒绝 */
    private Integer status;
    /** 审核拒绝原因 */
    private String rejectReason;
}
