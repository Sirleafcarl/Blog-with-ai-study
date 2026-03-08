package com.sirleaf.cheese.admin.model.vo.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QueryUserPageListRspVO {
    private Long id;
    private String username;
    private String nickname;
    private String avatar;
    private String email;
    private Boolean isDisabled;
    private String createTime;
}
