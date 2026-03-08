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
@TableName("t_comment")
public class CommentDO {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long articleId;
    private String nickname;
    private String email;
    private String content;
    /** 0:待审核 1:已显示 2:已屏蔽 */
    private Integer status;
    private Date createTime;
}
