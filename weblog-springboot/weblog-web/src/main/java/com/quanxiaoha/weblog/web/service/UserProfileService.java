package com.quanxiaoha.weblog.web.service;

import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.web.model.vo.user.UpdateUserPasswordReqVO;
import com.quanxiaoha.weblog.web.model.vo.user.UpdateUserProfileReqVO;
import org.springframework.web.multipart.MultipartFile;

public interface UserProfileService {
    Response getProfile();
    Response updateProfile(UpdateUserProfileReqVO reqVO);
    Response updatePassword(UpdateUserPasswordReqVO reqVO);
    Response uploadAvatar(MultipartFile file);
}
