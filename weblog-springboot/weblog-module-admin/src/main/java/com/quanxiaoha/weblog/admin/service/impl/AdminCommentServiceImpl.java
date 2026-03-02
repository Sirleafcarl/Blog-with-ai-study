package com.quanxiaoha.weblog.admin.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.quanxiaoha.weblog.admin.dao.AdminArticleDao;
import com.quanxiaoha.weblog.admin.dao.AdminCommentDao;
import com.quanxiaoha.weblog.admin.model.vo.comment.AdminCommentItemRspVO;
import com.quanxiaoha.weblog.admin.model.vo.comment.DeleteCommentReqVO;
import com.quanxiaoha.weblog.admin.model.vo.comment.QueryAdminCommentPageListReqVO;
import com.quanxiaoha.weblog.admin.service.AdminCommentService;
import com.quanxiaoha.weblog.common.PageResponse;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.ArticleDO;
import com.quanxiaoha.weblog.common.domain.dos.CommentDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdminCommentServiceImpl implements AdminCommentService {

    private static final SimpleDateFormat DATETIME_FMT = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    @Autowired
    private AdminCommentDao commentDao;

    @Autowired
    private AdminArticleDao articleDao;

    @Override
    public PageResponse queryCommentPageList(QueryAdminCommentPageListReqVO reqVO) {
        Page<CommentDO> page = commentDao.queryCommentPageList(
                reqVO.getCurrent(), reqVO.getSize(), reqVO.getNickname(), reqVO.getArticleId());

        List<CommentDO> records = page.getRecords();

        // 批量查文章标题
        Set<Long> articleIds = records.stream().map(CommentDO::getArticleId).collect(Collectors.toSet());
        Map<Long, String> articleTitleMap = articleIds.stream()
                .map(id -> articleDao.queryByArticleId(id))
                .filter(a -> a != null)
                .collect(Collectors.toMap(ArticleDO::getId, ArticleDO::getTitle, (a, b) -> a));

        List<AdminCommentItemRspVO> list = records.stream().map(c -> AdminCommentItemRspVO.builder()
                .id(c.getId())
                .articleId(c.getArticleId())
                .articleTitle(articleTitleMap.getOrDefault(c.getArticleId(), "已删除文章"))
                .nickname(c.getNickname())
                .email(c.getEmail())
                .content(c.getContent())
                .status(c.getStatus())
                .createTime(DATETIME_FMT.format(c.getCreateTime()))
                .build()).collect(Collectors.toList());

        return PageResponse.success(page, list);
    }

    @Override
    public Response deleteComment(DeleteCommentReqVO reqVO) {
        int rows = commentDao.deleteById(reqVO.getId());
        return rows > 0 ? Response.success() : Response.fail("评论不存在");
    }
}
