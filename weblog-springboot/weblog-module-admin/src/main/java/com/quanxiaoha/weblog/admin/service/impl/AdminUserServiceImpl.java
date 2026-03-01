package com.quanxiaoha.weblog.admin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.quanxiaoha.weblog.admin.dao.AdminUserDao;
import com.quanxiaoha.weblog.admin.model.vo.user.RegisterReqVO;
import com.quanxiaoha.weblog.admin.model.vo.user.UpdateAdminPasswordReqVO;
import com.quanxiaoha.weblog.admin.service.AdminUserService;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.UserDO;
import com.quanxiaoha.weblog.common.domain.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
@Slf4j
public class AdminUserServiceImpl extends ServiceImpl<UserMapper, UserDO> implements AdminUserService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AdminUserDao userDao;

    @Override
    public Response updateAdminPassword(UpdateAdminPasswordReqVO updateAdminPasswordReqVO) {
        UserDO userDO = UserDO.builder()
                .password(passwordEncoder.encode(updateAdminPasswordReqVO.getNewPassword()))
                .updateTime(new Date())
                .build();
        userDao.updateAdminPassword(userDO);
        return Response.success();
    }

    @Override
    public Response register(RegisterReqVO registerReqVO) {
        // 检查用户名是否已存在
        UserDO existUser = userDao.selectByUsername(registerReqVO.getUsername());
        if (existUser != null) {
            return Response.fail("用户名已存在");
        }

        // 创建新用户
        UserDO newUser = UserDO.builder()
                .username(registerReqVO.getUsername())
                .password(passwordEncoder.encode(registerReqVO.getPassword()))
                .createTime(new Date())
                .updateTime(new Date())
                .isDeleted(false)
                .build();

        // 插入用户
        int result = userDao.insertUser(newUser);
        if (result <= 0) {
            return Response.fail("用户注册失败");
        }

        log.info("==> 用户注册成功, username: {}", registerReqVO.getUsername());
        return Response.success();
    }
}
