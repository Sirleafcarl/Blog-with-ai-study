package com.sirleaf.cheese.web.controller;

import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import com.sirleaf.cheese.web.model.vo.user.UpdateUserPasswordReqVO;
import com.sirleaf.cheese.web.model.vo.user.UpdateUserProfileReqVO;
import com.sirleaf.cheese.web.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @PostMapping("/profile")
    @ApiOperationLog(description = "获取个人资料")
    public Response getProfile() {
        return userProfileService.getProfile();
    }

    @PostMapping("/profile/update")
    @ApiOperationLog(description = "修改个人资料")
    public Response updateProfile(@RequestBody @Validated UpdateUserProfileReqVO reqVO) {
        return userProfileService.updateProfile(reqVO);
    }

    @PostMapping("/password/update")
    @ApiOperationLog(description = "修改密码")
    public Response updatePassword(@RequestBody @Validated UpdateUserPasswordReqVO reqVO) {
        return userProfileService.updatePassword(reqVO);
    }

    @PostMapping("/avatar/upload")
    @ApiOperationLog(description = "上传头像")
    public Response uploadAvatar(@RequestParam MultipartFile file) {
        return userProfileService.uploadAvatar(file);
    }
}
