package com.sirleaf.cheese.common.domain.dos;

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
@NoArgsConstructor
@AllArgsConstructor
@TableName("t_statistics_article_pv")
public class StatisticsArticlePVDO {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Date pvDate;
    private Long pvCount;
    private Date createTime;
    private Date updateTime;
}
