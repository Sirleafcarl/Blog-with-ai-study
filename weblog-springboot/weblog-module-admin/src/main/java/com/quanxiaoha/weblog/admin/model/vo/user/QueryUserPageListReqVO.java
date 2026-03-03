package com.quanxiaoha.weblog.admin.model.vo.user;

import lombok.Data;

@Data
public class QueryUserPageListReqVO {
    private Long current = 1L;
    private Long size = 10L;
    private String searchUsername;
}
