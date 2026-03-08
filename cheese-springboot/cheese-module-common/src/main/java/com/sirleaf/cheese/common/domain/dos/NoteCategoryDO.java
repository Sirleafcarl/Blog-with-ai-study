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
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_note_category")
public class NoteCategoryDO {
    @TableId(type = IdType.AUTO)
    private Long id;
    /** 所属用户名 */
    private String username;
    /** 分类名称 */
    private String name;
    private Date createTime;
    private Date updateTime;
    private Boolean isDeleted;
}
