package com.quanxiaoha.weblog.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.CommentDO;
import com.quanxiaoha.weblog.common.domain.dos.UserDO;
import com.quanxiaoha.weblog.common.domain.mapper.UserMapper;
import com.quanxiaoha.weblog.web.dao.WebCommentDao;
import com.quanxiaoha.weblog.web.model.vo.comment.CommentItemRspVO;
import com.quanxiaoha.weblog.web.model.vo.comment.PostCommentReqVO;
import com.quanxiaoha.weblog.web.model.vo.comment.QueryCommentPageListReqVO;
import com.quanxiaoha.weblog.web.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private static final SimpleDateFormat DATETIME_FMT = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    @Autowired
    private WebCommentDao commentDao;
    @Autowired
    private UserMapper userMapper;

    @Override
    public Response postComment(PostCommentReqVO reqVO) {
        // 从 Security 上下文获取当前登录用户名
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        // 取用户昵称，未设置则回退到用户名
        QueryWrapper<UserDO> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(UserDO::getUsername, username).eq(UserDO::getIsDeleted, false);
        UserDO userDO = userMapper.selectOne(wrapper);
        String nickname = (userDO != null
                && userDO.getNickname() != null
                && !userDO.getNickname().isEmpty())
                ? userDO.getNickname() : username;

        CommentDO commentDO = CommentDO.builder()
                .articleId(reqVO.getArticleId())
                .nickname(nickname)
                .email("")
                .content(reqVO.getContent())
                .status(1)
                .createTime(new Date())
                .build();
        commentDao.insertComment(commentDO);
        return Response.success();
    }

    @Override
    public PageResponse queryCommentPageList(QueryCommentPageListReqVO reqVO) {
        if (reqVO.getArticleId() == null) {
            return PageResponse.success(null, Collections.emptyList());
        }
        IPage<CommentDO> page = commentDao.queryCommentPageListByArticleId(
                reqVO.getCurrent(), reqVO.getSize(), reqVO.getArticleId());

        List<CommentItemRspVO> list = page.getRecords().stream().map(c -> CommentItemRspVO.builder()
                .id(c.getId())
                .nickname(c.getNickname())
                .content(c.getContent())
                .createTime(DATETIME_FMT.format(c.getCreateTime()))
                .build()).collect(Collectors.toList());

        return PageResponse.success(page, list);
    }
}
