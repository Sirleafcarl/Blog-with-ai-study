package com.sirleaf.cheese.admin.controller;

import com.sirleaf.cheese.admin.model.vo.user.QueryUserDetailRspVO;
import com.sirleaf.cheese.admin.model.vo.user.QueryUserPageListReqVO;
import com.sirleaf.cheese.admin.model.vo.user.RegisterReqVO;
import com.sirleaf.cheese.admin.model.vo.user.UpdateAdminPasswordReqVO;
import com.sirleaf.cheese.admin.model.vo.user.UpdateUserStatusReqVO;
import com.sirleaf.cheese.admin.service.AdminBlogSettingService;
import com.sirleaf.cheese.admin.service.AdminUserService;
import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/admin")
public class AdminUserController {

    @Autowired
    private AdminBlogSettingService blogSettingService;
    @Autowired
    private AdminUserService userService;

    @PostMapping("/password/update")
    @ApiOperationLog(description = "修改用户密码")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Response updateAdminPassword(@RequestBody @Validated UpdateAdminPasswordReqVO updateAdminPasswordReqVO) {
        return userService.updateAdminPassword(updateAdminPasswordReqVO);
    }

    @PostMapping("/detail")
    @ApiOperationLog(description = "获取登录用户信息")
    public Response<QueryUserDetailRspVO> queryAdminDetail() {
        return blogSettingService.queryNicknameAndAvatar();
    }

    @PostMapping("/register")
    @ApiOperationLog(description = "用户注册")
    public Response register(@RequestBody @Validated RegisterReqVO registerReqVO) {
        return userService.register(registerReqVO);
    }

    @PostMapping("/user/list")
    @ApiOperationLog(description = "查询用户分页列表")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public PageResponse queryUserPageList(@RequestBody @Validated QueryUserPageListReqVO reqVO) {
        return userService.queryUserPageList(reqVO);
    }

    @PostMapping("/user/updateStatus")
    @ApiOperationLog(description = "更新用户禁用状态")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Response updateUserStatus(@RequestBody @Validated UpdateUserStatusReqVO reqVO) {
        return userService.updateUserStatus(reqVO);
    }
}

