package com.sirleaf.cheese.admin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sirleaf.cheese.admin.model.vo.blogsetting.QueryBlogSettingRspVO;
import com.sirleaf.cheese.admin.model.vo.blogsetting.UpdateBlogSettingReqVO;
import com.sirleaf.cheese.admin.model.vo.user.QueryUserDetailRspVO;
import com.sirleaf.cheese.admin.service.AdminBlogSettingService;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.mapper.BlogSettingMapper;
import com.sirleaf.cheese.common.domain.dos.BlogSettingDO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@Slf4j
public class AdminBlogSettingServiceImpl extends ServiceImpl<BlogSettingMapper, BlogSettingDO> implements AdminBlogSettingService {
    @Override
    public Response updateBlogSetting(UpdateBlogSettingReqVO updateBlogSettingReqVO) {
        BlogSettingDO blogSettingDO = BlogSettingDO.builder()
                .id(1L)
                .blogName(updateBlogSettingReqVO.getBlogName())
                .author(updateBlogSettingReqVO.getAuthor())
                .avatar(updateBlogSettingReqVO.getAvatar())
                .introduction(updateBlogSettingReqVO.getIntroduction())
                .githubHome(updateBlogSettingReqVO.getGithubHome())
                .giteeHome(updateBlogSettingReqVO.getGiteeHome())
                .csdnHome(updateBlogSettingReqVO.getCsdnHome())
                .zhihuHome(updateBlogSettingReqVO.getZhihuHome())
                .build();
        saveOrUpdate(blogSettingDO);
        return Response.success();
    }

    @Override
    public Response queryBlogSettingDetail() {
        BlogSettingDO blogSettingDO = getOne(null);

        QueryBlogSettingRspVO queryBlogSettingRspVO = null;
        if (Objects.nonNull(blogSettingDO)) {
            queryBlogSettingRspVO = QueryBlogSettingRspVO.builder()
                    .id(blogSettingDO.getId())
                    .blogName(blogSettingDO.getBlogName())
                    .author(blogSettingDO.getAuthor())
                    .avatar(blogSettingDO.getAvatar())
                    .introduction(blogSettingDO.getIntroduction())
                    .githubHome(blogSettingDO.getGithubHome())
                    .csdnHome(blogSettingDO.getCsdnHome())
                    .giteeHome(blogSettingDO.getGiteeHome())
                    .zhihuHome(blogSettingDO.getZhihuHome())
                    .build();
        }
        return Response.success(queryBlogSettingRspVO);
    }

    @Override
    public Response<QueryUserDetailRspVO> queryNicknameAndAvatar() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        QueryUserDetailRspVO queryBlogSettingRspVO = QueryUserDetailRspVO.builder()
                .username(username)
                .roles(roles)
                .build();

        BlogSettingDO blogSettingDO = getOne(null);
        if (blogSettingDO != null) {
            queryBlogSettingRspVO.setAvatar(blogSettingDO.getAvatar());
        }
        return Response.success(queryBlogSettingRspVO);
    }
}
