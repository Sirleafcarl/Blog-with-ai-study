package com.sirleaf.cheese.web.service;

import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.web.model.vo.user.UpdateUserPasswordReqVO;
import com.sirleaf.cheese.web.model.vo.user.UpdateUserProfileReqVO;
import org.springframework.web.multipart.MultipartFile;

public interface UserProfileService {
    Response getProfile();
    Response updateProfile(UpdateUserProfileReqVO reqVO);
    Response updatePassword(UpdateUserPasswordReqVO reqVO);
    Response uploadAvatar(MultipartFile file);
}
