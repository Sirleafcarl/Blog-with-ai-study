package com.sirleaf.cheese.web.model.vo.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetUserProfileRspVO {
    private String username;
    private String nickname;
    private String avatar;
    private String email;
    private String bio;
}
