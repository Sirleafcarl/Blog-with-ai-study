package com.quanxiaoha.weblog.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.quanxiaoha.weblog.admin.model.vo.user.QueryUserPageListReqVO;
import com.quanxiaoha.weblog.admin.model.vo.user.UpdateUserStatusReqVO;
import com.quanxiaoha.weblog.admin.model.vo.user.RegisterReqVO;
import com.quanxiaoha.weblog.admin.model.vo.user.UpdateAdminPasswordReqVO;
import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.UserDO;


public interface AdminUserService extends IService<UserDO> {
    Response updateAdminPassword(UpdateAdminPasswordReqVO updateAdminPasswordReqVO);

    Response register(RegisterReqVO registerReqVO);

    PageResponse queryUserPageList(QueryUserPageListReqVO reqVO);

    Response updateUserStatus(UpdateUserStatusReqVO reqVO);
}

