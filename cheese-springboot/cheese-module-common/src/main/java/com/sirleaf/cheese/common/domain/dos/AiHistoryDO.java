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
@TableName("t_ai_history")
public class AiHistoryDO {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String username;
    private Long noteId;
    private String noteTitle;
    private String type;
    private String content;
    private Integer score;
    private Date createTime;
}
