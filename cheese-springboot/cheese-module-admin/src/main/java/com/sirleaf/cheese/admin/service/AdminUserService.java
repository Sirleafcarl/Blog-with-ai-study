package com.sirleaf.cheese.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sirleaf.cheese.admin.model.vo.user.QueryUserPageListReqVO;
import com.sirleaf.cheese.admin.model.vo.user.UpdateUserStatusReqVO;
import com.sirleaf.cheese.admin.model.vo.user.RegisterReqVO;
import com.sirleaf.cheese.admin.model.vo.user.UpdateAdminPasswordReqVO;
import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.UserDO;


public interface AdminUserService extends IService<UserDO> {
    Response updateAdminPassword(UpdateAdminPasswordReqVO updateAdminPasswordReqVO);

    Response register(RegisterReqVO registerReqVO);

    PageResponse queryUserPageList(QueryUserPageListReqVO reqVO);

    Response updateUserStatus(UpdateUserStatusReqVO reqVO);
}

