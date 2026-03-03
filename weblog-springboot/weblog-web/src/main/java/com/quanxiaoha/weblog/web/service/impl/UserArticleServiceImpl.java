package com.quanxiaoha.weblog.web.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.google.common.collect.Lists;
import com.quanxiaoha.weblog.admin.dao.*;
import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.*;
import com.quanxiaoha.weblog.web.dao.UserArticleDao;
import com.quanxiaoha.weblog.web.model.vo.article.QueryUserArticlePageListReqVO;
import com.quanxiaoha.weblog.web.model.vo.article.SubmitUserArticleReqVO;
import com.quanxiaoha.weblog.web.model.vo.article.UpdateUserArticleReqVO;
import com.quanxiaoha.weblog.web.service.UserArticleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserArticleServiceImpl implements UserArticleService {

    @Autowired
    private UserArticleDao userArticleDao;
    @Autowired
    private AdminArticleContentDao articleContentDao;
    @Autowired
    private AdminArticleCategoryRelDao articleCategoryRelDao;
    @Autowired
    private AdminTagDao tagDao;
    @Autowired
    private AdminArticleTagRelDao articleTagRelDao;

    private final TransactionTemplate transactionTemplate;

    @Autowired
    public UserArticleServiceImpl(PlatformTransactionManager transactionManager) {
        this.transactionTemplate = new TransactionTemplate(transactionManager);
    }

    private String currentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    @Override
    public Response submitArticle(SubmitUserArticleReqVO reqVO) {
        String username = currentUsername();
        // status 0=草稿, 1=审核中
        int status = Boolean.TRUE.equals(reqVO.getIsDraft()) ? 0 : 1;

        Boolean isExecuteSuccess = transactionTemplate.execute(txStatus -> {
            // 插入文章基本信息
            ArticleDO articleDO = ArticleDO.builder()
                    .title(reqVO.getTitle())
                    .titleImage(reqVO.getTitleImage() != null ? reqVO.getTitleImage() : "")
                    .description(reqVO.getDescription())
                    .readNum(0L)
                    .isTop(false)
                    .isPublished(false)
                    .isDeleted(false)
                    .authorUsername(username)
                    .status(status)
                    .createTime(new Date())
                    .updateTime(new Date())
                    .build();
            userArticleDao.insertArticle(articleDO);
            Long articleId = articleDO.getId();

            // 文章内容
            ArticleContentDO contentDO = ArticleContentDO.builder()
                    .articleId(articleId)
                    .content(reqVO.getContent())
                    .build();
            articleContentDao.insertArticleContent(contentDO);

            // 分类关联
            ArticleCategoryRelDO categoryRelDO = ArticleCategoryRelDO.builder()
                    .articleId(articleId)
                    .categoryId(reqVO.getCategoryId())
                    .build();
            articleCategoryRelDao.insert(categoryRelDO);

            // 标签关联
            handleTagBiz(articleId, reqVO.getTags());
            return true;
        });

        return Boolean.TRUE.equals(isExecuteSuccess) ? Response.success() : Response.fail("投稿失败，请稍后重试");
    }

    @Override
    public Response updateArticle(UpdateUserArticleReqVO reqVO) {
        String username = currentUsername();
        Long articleId = reqVO.getId();

        // 校验文章归属
        ArticleDO existing = userArticleDao.queryByIdAndAuthor(articleId, username);
        if (existing == null) {
            return Response.fail("文章不存在或无权限修改");
        }
        // 只有草稿(0)或已拒绝(3)状态可以修改
        if (existing.getStatus() != 0 && existing.getStatus() != 3) {
            return Response.fail("只有草稿或已拒绝的文章才能修改");
        }

        int newStatus = Boolean.TRUE.equals(reqVO.getIsDraft()) ? 0 : 1;

        Boolean isExecuteSuccess = transactionTemplate.execute(txStatus -> {
            ArticleDO updateDO = ArticleDO.builder()
                    .id(articleId)
                    .title(reqVO.getTitle())
                    .titleImage(reqVO.getTitleImage() != null ? reqVO.getTitleImage() : "")
                    .description(reqVO.getDescription())
                    .status(newStatus)
                    .rejectReason(null)   // 重新提交时清除拒绝原因
                    .updateTime(new Date())
                    .build();
            userArticleDao.updateById(updateDO);

            // 更新内容
            ArticleContentDO contentDO = ArticleContentDO.builder()
                    .articleId(articleId)
                    .content(reqVO.getContent())
                    .build();
            articleContentDao.updateByArticleId(contentDO);

            // 更新分类
            articleCategoryRelDao.deleteByArticleId(articleId);
            ArticleCategoryRelDO categoryRelDO = ArticleCategoryRelDO.builder()
                    .articleId(articleId)
                    .categoryId(reqVO.getCategoryId())
                    .build();
            articleCategoryRelDao.insert(categoryRelDO);

            // 更新标签
            articleTagRelDao.deleteByArticleId(articleId);
            handleTagBiz(articleId, reqVO.getTags());

            return true;
        });

        return Boolean.TRUE.equals(isExecuteSuccess) ? Response.success() : Response.fail("更新失败，请稍后重试");
    }

    @Override
    public Response deleteArticle(Long articleId) {
        String username = currentUsername();
        ArticleDO existing = userArticleDao.queryByIdAndAuthor(articleId, username);
        if (existing == null) {
            return Response.fail("文章不存在或无权限删除");
        }
        // 逻辑删除
        ArticleDO deleteDO = ArticleDO.builder()
                .id(articleId)
                .isDeleted(true)
                .updateTime(new Date())
                .build();
        userArticleDao.updateById(deleteDO);
        return Response.success();
    }

    @Override
    public Response getMyArticleList(QueryUserArticlePageListReqVO reqVO) {
        String username = currentUsername();
        Page<ArticleDO> page = userArticleDao.queryByAuthorAndStatus(
                reqVO.getCurrent(), reqVO.getSize(), username, reqVO.getStatus());
        return Response.success(page);
    }

    @Override
    public Response getMyArticleDetail(Long articleId) {
        String username = currentUsername();
        ArticleDO articleDO = userArticleDao.queryByIdAndAuthor(articleId, username);
        if (articleDO == null) {
            return Response.fail("文章不存在或无权限查看");
        }
        ArticleContentDO contentDO = articleContentDao.queryByArticleId(articleId);
        ArticleCategoryRelDO categoryRelDO = articleCategoryRelDao.selectByArticleId(articleId);
        List<ArticleTagRelDO> tagRelDOS = articleTagRelDao.selectByArticleId(articleId);
        List<Long> tagIds = tagRelDOS.stream().map(ArticleTagRelDO::getTagId).collect(Collectors.toList());

        Map<String, Object> detail = new HashMap<>();
        detail.put("id", articleDO.getId());
        detail.put("title", articleDO.getTitle());
        detail.put("titleImage", articleDO.getTitleImage());
        detail.put("description", articleDO.getDescription());
        detail.put("content", contentDO != null ? contentDO.getContent() : "");
        detail.put("categoryId", categoryRelDO != null ? categoryRelDO.getCategoryId() : null);
        detail.put("tagIds", tagIds);
        detail.put("status", articleDO.getStatus());
        detail.put("rejectReason", articleDO.getRejectReason());
        detail.put("createTime", articleDO.getCreateTime());
        detail.put("updateTime", articleDO.getUpdateTime());
        return Response.success(detail);
    }

    /**
     * 处理标签关联业务（与管理员发布文章逻辑一致）
     */
    private void handleTagBiz(Long articleId, List<String> tags) {
        if (CollectionUtils.isEmpty(tags)) return;

        List<TagDO> allTags = tagDao.selectAll();
        Map<String, Long> name2id = allTags.stream()
                .collect(Collectors.toMap(TagDO::getName, TagDO::getId, (a, b) -> a));
        Map<Long, String> id2name = allTags.stream()
                .collect(Collectors.toMap(TagDO::getId, TagDO::getName));

        Set<Long> finalTagIds = new HashSet<>();
        List<String> namesToCreate = new ArrayList<>();

        for (String raw : tags) {
            if (raw == null || raw.trim().isEmpty()) continue;
            String item = raw.trim();
            if (item.matches("\\d+")) {
                try {
                    Long id = Long.valueOf(item);
                    if (id2name.containsKey(id)) {
                        finalTagIds.add(id);
                        continue;
                    }
                } catch (NumberFormatException ignore) {}
            }
            if (name2id.containsKey(item)) {
                finalTagIds.add(name2id.get(item));
            } else {
                namesToCreate.add(item);
            }
        }

        if (!namesToCreate.isEmpty()) {
            for (String name : namesToCreate) {
                TagDO tagDO = TagDO.builder()
                        .name(name)
                        .createTime(new Date())
                        .updateTime(new Date())
                        .build();
                tagDao.insert(tagDO);
                finalTagIds.add(tagDO.getId());
            }
        }

        if (!finalTagIds.isEmpty()) {
            List<ArticleTagRelDO> rels = Lists.newArrayList();
            for (Long tagId : finalTagIds) {
                rels.add(ArticleTagRelDO.builder()
                        .articleId(articleId)
                        .tagId(tagId)
                        .build());
            }
            articleTagRelDao.insertBatch(rels);
        }
    }
}
