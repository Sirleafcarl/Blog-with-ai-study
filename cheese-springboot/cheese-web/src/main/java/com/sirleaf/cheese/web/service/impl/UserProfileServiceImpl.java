package com.sirleaf.cheese.web.service.impl;

import com.sirleaf.cheese.admin.model.vo.file.UploadFileRspVO;
import com.sirleaf.cheese.admin.utils.MinioUtil;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.UserDO;
import com.sirleaf.cheese.web.dao.UserProfileDao;
import com.sirleaf.cheese.web.model.vo.user.GetUserProfileRspVO;
import com.sirleaf.cheese.web.model.vo.user.UpdateUserPasswordReqVO;
import com.sirleaf.cheese.web.model.vo.user.UpdateUserProfileReqVO;
import com.sirleaf.cheese.web.service.UserProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Service
@Slf4j
public class UserProfileServiceImpl implements UserProfileService {

    @Autowired
    private UserProfileDao userProfileDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MinioUtil minioUtil;

    private String currentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    @Override
    public Response getProfile() {
        String username = currentUsername();
        UserDO userDO = userProfileDao.selectByUsername(username);
        if (userDO == null) {
            return Response.fail("用户不存在");
        }
        GetUserProfileRspVO rspVO = GetUserProfileRspVO.builder()
                .username(userDO.getUsername())
                .nickname(userDO.getNickname() != null ? userDO.getNickname() : userDO.getUsername())
                .avatar(userDO.getAvatar())
                .email(userDO.getEmail())
                .bio(userDO.getBio())
                .build();
        return Response.success(rspVO);
    }

    @Override
    public Response updateProfile(UpdateUserProfileReqVO reqVO) {
        String username = currentUsername();
        UserDO userDO = UserDO.builder()
                .username(username)
                .nickname(reqVO.getNickname())
                .avatar(reqVO.getAvatar())
                .email(reqVO.getEmail())
                .bio(reqVO.getBio())
                .updateTime(new Date())
                .build();
        userProfileDao.updateProfile(userDO);
        return Response.success();
    }

    @Override
    public Response updatePassword(UpdateUserPasswordReqVO reqVO) {
        String username = currentUsername();
        UserDO userDO = userProfileDao.selectByUsername(username);
        if (userDO == null) {
            return Response.fail("用户不存在");
        }
        if (!passwordEncoder.matches(reqVO.getOldPassword(), userDO.getPassword())) {
            return Response.fail("原密码不正确");
        }
        UserDO updateDO = UserDO.builder()
                .username(username)
                .password(passwordEncoder.encode(reqVO.getNewPassword()))
                .updateTime(new Date())
                .build();
        userProfileDao.updateProfile(updateDO);
        return Response.success();
    }

    @Override
    public Response uploadAvatar(MultipartFile file) {
        try {
            String url = minioUtil.uploadFile(file);
            return Response.success(UploadFileRspVO.builder().url(url).build());
        } catch (Exception e) {
            log.error("==> 上传头像异常: ", e);
            return Response.fail("头像上传失败，请稍后重试");
        }
    }
}
