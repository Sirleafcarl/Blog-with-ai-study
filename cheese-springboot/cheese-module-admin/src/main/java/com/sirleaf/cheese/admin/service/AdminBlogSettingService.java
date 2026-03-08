package com.sirleaf.cheese.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sirleaf.cheese.admin.model.vo.blogsetting.UpdateBlogSettingReqVO;
import com.sirleaf.cheese.admin.model.vo.user.QueryUserDetailRspVO;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.BlogSettingDO;


public interface AdminBlogSettingService extends IService<BlogSettingDO> {

    Response updateBlogSetting(UpdateBlogSettingReqVO updateBlogSettingReqVO);

    Response queryBlogSettingDetail();

    Response<QueryUserDetailRspVO> queryNicknameAndAvatar();
}
