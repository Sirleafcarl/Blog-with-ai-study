package com.sirleaf.cheese.admin.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sirleaf.cheese.admin.dao.AdminUserDao;
import com.sirleaf.cheese.admin.model.vo.user.QueryUserPageListReqVO;
import com.sirleaf.cheese.admin.model.vo.user.QueryUserPageListRspVO;
import com.sirleaf.cheese.admin.model.vo.user.RegisterReqVO;
import com.sirleaf.cheese.admin.model.vo.user.UpdateAdminPasswordReqVO;
import com.sirleaf.cheese.admin.model.vo.user.UpdateUserStatusReqVO;
import com.sirleaf.cheese.admin.service.AdminUserService;
import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.UserDO;
import com.sirleaf.cheese.common.domain.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
public class AdminUserServiceImpl extends ServiceImpl<UserMapper, UserDO> implements AdminUserService {

    private static final SimpleDateFormat DATETIME_FMT = new SimpleDateFormat("yyyy-MM-dd HH:mm");

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
                .isDisabled(false)
                .build();

        // 插入用户
        int result = userDao.insertUser(newUser);
        if (result <= 0) {
            return Response.fail("用户注册失败");
        }

        log.info("==> 用户注册成功, username: {}", registerReqVO.getUsername());
        return Response.success();
    }

    @Override
    public PageResponse queryUserPageList(QueryUserPageListReqVO reqVO) {
        Page<UserDO> page = userDao.queryUserPageList(reqVO.getCurrent(), reqVO.getSize(), reqVO.getSearchUsername());
        List<UserDO> records = page.getRecords();

        List<QueryUserPageListRspVO> list = records.stream().map(u -> QueryUserPageListRspVO.builder()
                .id(u.getId())
                .username(u.getUsername())
                .nickname(u.getNickname())
                .avatar(u.getAvatar())
                .email(u.getEmail())
                .isDisabled(Boolean.TRUE.equals(u.getIsDisabled()))
                .createTime(u.getCreateTime() != null ? DATETIME_FMT.format(u.getCreateTime()) : "")
                .build()).collect(Collectors.toList());

        return PageResponse.success(page, list);
    }

    @Override
    public Response updateUserStatus(UpdateUserStatusReqVO reqVO) {
        int rows = userDao.updateUserStatus(reqVO.getUserId(), reqVO.getIsDisabled());
        if (rows <= 0) {
            return Response.fail("用户不存在");
        }
        log.info("==> 管理员更新用户状态, userId: {}, isDisabled: {}", reqVO.getUserId(), reqVO.getIsDisabled());
        return Response.success();
    }
}

