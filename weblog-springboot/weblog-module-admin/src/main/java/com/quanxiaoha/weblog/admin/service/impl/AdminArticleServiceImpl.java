package com.quanxiaoha.weblog.admin.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.google.common.collect.Lists;
import com.quanxiaoha.weblog.admin.dao.*;
import com.quanxiaoha.weblog.common.domain.dos.*;
import com.quanxiaoha.weblog.admin.model.vo.article.*;
import com.quanxiaoha.weblog.admin.service.AdminArticleService;
import com.quanxiaoha.weblog.common.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.CollectionUtils;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
public class AdminArticleServiceImpl implements AdminArticleService {

    @Autowired
    private AdminArticleDao articleDao;
    @Autowired
    private AdminArticleContentDao articleContentDao;
    @Autowired
    private AdminArticleCategoryRelDao articleCategoryRelDao;
    @Autowired
    private AdminTagDao tagDao;
    @Autowired
    private AdminArticleTagRelDao articleTagRelDao;

    // 手动事务
    private final TransactionTemplate transactionTemplate;

    @Autowired
    public AdminArticleServiceImpl(PlatformTransactionManager transactionManager) {
        this.transactionTemplate = new TransactionTemplate(transactionManager);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Response publishArticle(PublishArticleReqVO publishArticleReqVO) {
        // basic parameter validation
        if (publishArticleReqVO == null) {
            return Response.fail("发布参数不能为空");
        }
        if (publishArticleReqVO.getTitle() == null || publishArticleReqVO.getTitle().trim().isEmpty()) {
            return Response.fail("文章标题不能为空");
        }
        if (publishArticleReqVO.getContent() == null || publishArticleReqVO.getContent().trim().isEmpty()) {
            return Response.fail("文章内容不能为空");
        }
        if (publishArticleReqVO.getCategoryId() == null) {
            return Response.fail("请选择文章分类");
        }
        // 标签列表可为空，由 handleTagBiz 处理

        boolean isExecuteSuccess = transactionTemplate.execute(status -> {
            ArticleDO articleDO = ArticleDO.builder()
                    .title(publishArticleReqVO.getTitle())
                    .titleImage(publishArticleReqVO.getTitleImage())
                    .description(publishArticleReqVO.getDescription())
                    .createTime(new Date())
                    .updateTime(new Date())
                    .isDeleted(false)
                    .isTop(publishArticleReqVO.getIsTop() != null ? publishArticleReqVO.getIsTop() : false)
                    .isPublished(publishArticleReqVO.getIsPublished() != null ? publishArticleReqVO.getIsPublished() : true)
                    .status(2)  // 管理员直接发布，状态=已发布
                    .build();
            articleDao.insertArticle(articleDO);

            Long articleId = articleDO.getId();

            ArticleContentDO articleContentDO = ArticleContentDO.builder()
                    .articleId(articleId)
                    .content(publishArticleReqVO.getContent())
                    .build();
            articleContentDao.insertArticleContent(articleContentDO);

            // 所属分类
            ArticleCategoryRelDO articleCategoryRelDO = ArticleCategoryRelDO.builder()
                    .articleId(articleId)
                    .categoryId(publishArticleReqVO.getCategoryId())
                    .build();
            articleCategoryRelDao.insert(articleCategoryRelDO);

            // 标签
            // 提交的标签
            List<String> publishTags = publishArticleReqVO.getTags();
            handleTagBiz(articleId, publishTags);
            return true;
        });

        return isExecuteSuccess ? Response.success() : Response.fail();
    }

    @Override
    public Response queryArticleDetail(QueryArticleDetailReqVO queryArticleDetailReqVO) {
        Long articleId = queryArticleDetailReqVO.getArticleId();
        ArticleDO articleDO = articleDao.queryByArticleId(articleId);
        ArticleContentDO articleContentDO = articleContentDao.queryByArticleId(articleId);

        // 所属分类
        ArticleCategoryRelDO articleCategoryRelDO = articleCategoryRelDao.selectByArticleId(articleId);

        // 对应标签
        List<ArticleTagRelDO> articleTagRelDOS = articleTagRelDao.selectByArticleId(articleId);
        List<Long> tagIds = articleTagRelDOS.stream().map(p -> p.getTagId()).collect(Collectors.toList());

        QueryArticleDetailRspVO queryArticleDetailRspVO = QueryArticleDetailRspVO.builder()
                .id(articleDO.getId())
                .title(articleDO.getTitle())
                .titleImage(articleDO.getTitleImage())
                .content(articleContentDO.getContent())
                .categoryId(articleCategoryRelDO.getCategoryId())
                .tagIds(tagIds)
                .description(articleDO.getDescription())
                .isTop(articleDO.getIsTop())
                .isPublished(articleDO.getIsPublished())
                .build();

        return Response.success(queryArticleDetailRspVO);
    }

    @Override
    public Response queryArticlePageList(QueryArticlePageListReqVO queryArticlePageListReqVO) {
        Long current = queryArticlePageListReqVO.getCurrent();
        Long size = queryArticlePageListReqVO.getSize();
        Date startDate = queryArticlePageListReqVO.getStartDate();
        Date endDate = queryArticlePageListReqVO.getEndDate();
        String searchTitle = queryArticlePageListReqVO.getSearchTitle();
        Integer status = queryArticlePageListReqVO.getStatus();

        Page<ArticleDO> articleDOPage = articleDao.queryArticlePageListByStatus(
                current, size, startDate, endDate, searchTitle, status);

        return Response.success(articleDOPage);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Response deleteArticle(DeleteArticleReqVO deleteArticleReqVO) {
        Long articleId = deleteArticleReqVO.getArticleId();
        articleDao.deleteById(articleId);
        articleContentDao.deleteByArticleId(articleId);
        return Response.success();
    }

    @Override
    // @Transactional(rollbackFor = Exception.class)
    public Response updateArticle(UpdateArticleReqVO updateArticleReqVO) {
        // 更新文章分类
        // 更新文章标签
        // 提交的标签
        boolean isExecuteSuccess = Boolean.TRUE.equals(transactionTemplate.execute(status -> {
            Long articleId = updateArticleReqVO.getId();

            ArticleDO articleDO = ArticleDO.builder()
                    .id(articleId)
                    .title(updateArticleReqVO.getTitle())
                    .titleImage(updateArticleReqVO.getTitleImage())
                    .description(updateArticleReqVO.getDescription())
                    .updateTime(new Date())
                    .isTop(updateArticleReqVO.getIsTop() != null ? updateArticleReqVO.getIsTop() : false)
                    .isPublished(updateArticleReqVO.getIsPublished() != null ? updateArticleReqVO.getIsPublished() : true)
                    .build();
            articleDao.updateById(articleDO);

            ArticleContentDO articleContentDO = ArticleContentDO.builder()
                    .articleId(articleId)
                    .content(updateArticleReqVO.getContent())
                    .build();
            articleContentDao.updateByArticleId(articleContentDO);

            // 更新文章分类
            articleCategoryRelDao.deleteByArticleId(articleId);
            ArticleCategoryRelDO articleCategoryRelDO = ArticleCategoryRelDO.builder()
                    .articleId(articleId)
                    .categoryId(updateArticleReqVO.getCategoryId())
                    .build();
            articleCategoryRelDao.insert(articleCategoryRelDO);

            // 更新文章标签
            articleTagRelDao.deleteByArticleId(articleId);
            // 提交的标签
            List<String> publishTags = updateArticleReqVO.getTags();
            handleTagBiz(articleId, publishTags);
            return true;
        }));

        return isExecuteSuccess ? Response.success() : Response.fail();
    }

    /**
     * 处理标签相关业务
     * @param articleId
     * @param publishTags
     */
    public void handleTagBiz(Long articleId, List<String> publishTags) {
        // publishTags 可以为 null 或空
        if (CollectionUtils.isEmpty(publishTags)) {
            return;
        }

        // 查询所有标签用于名称/id映射
        List<TagDO> tagDOS = tagDao.selectAll();
        // map: name -> id
        java.util.Map<String, Long> name2id = tagDOS.stream()
                .collect(Collectors.toMap(TagDO::getName, TagDO::getId, (a, b) -> a));
        // map: id -> name (用于直接提交 id 的情况)
        java.util.Map<Long, String> id2name = tagDOS.stream()
                .collect(Collectors.toMap(TagDO::getId, TagDO::getName));

        // 准备最终所有要关联的 tagId
        java.util.Set<Long> finalTagIds = new java.util.HashSet<>();
        java.util.List<String> namesToCreate = new java.util.ArrayList<>();

        for (String raw : publishTags) {
            if (raw == null || raw.trim().isEmpty()) {
                continue;
            }
            String item = raw.trim();
            // 判断纯数字字符串
            if (item.matches("\\d+")) {
                try {
                    Long id = Long.valueOf(item);
                    if (id2name.containsKey(id)) {
                        finalTagIds.add(id);
                        continue;
                    }
                } catch (NumberFormatException ignore) {
                }
            }
            // 不是数字或数字在库中不存在，按名称查找
            if (name2id.containsKey(item)) {
                finalTagIds.add(name2id.get(item));
            } else {
                // 将来需要在库中创建
                namesToCreate.add(item);
            }
        }

        // 插入新标签并收集其ID
        if (!CollectionUtils.isEmpty(namesToCreate)) {
            for (String newName : namesToCreate) {
                TagDO tagDO = TagDO.builder()
                        .name(newName)
                        .createTime(new Date())
                        .updateTime(new Date())
                        .build();
                tagDao.insert(tagDO);
                finalTagIds.add(tagDO.getId());
            }
        }

        // 最后批量插入关系
        if (!finalTagIds.isEmpty()) {
            List<ArticleTagRelDO> articleTagRelDOS = Lists.newArrayList();
            for (Long tagId : finalTagIds) {
                ArticleTagRelDO articleTagRelDO = ArticleTagRelDO.builder()
                        .articleId(articleId)
                        .tagId(tagId)
                        .build();
                articleTagRelDOS.add(articleTagRelDO);
            }
            articleTagRelDao.insertBatch(articleTagRelDOS);
        }
    }

    @Override
    public Response updateArticleTopOrPublished(UpdateArticleStatusReqVO reqVO) {
        ArticleDO articleDO = ArticleDO.builder()
                .id(reqVO.getId())
                .isTop(reqVO.getIsTop())
                .isPublished(reqVO.getIsPublished())
                .updateTime(new Date())
                .build();
        int rows = articleDao.updateById(articleDO);
        return rows > 0 ? Response.success() : Response.fail("更新失败");
    }

    @Override
    public Response auditArticle(AuditArticleReqVO reqVO) {
        Long articleId = reqVO.getArticleId();
        Integer action = reqVO.getAction();
        // action: 2=通过发布, 3=拒绝
        if (action != 2 && action != 3) {
            return Response.fail("无效的审核操作，1=通过，3=拒绝");
        }
        ArticleDO existing = articleDao.queryByArticleId(articleId);
        if (existing == null) {
            return Response.fail("文章不存在");
        }
        ArticleDO update = ArticleDO.builder()
                .id(articleId)
                .status(action)
                .rejectReason(action == 3 ? reqVO.getRejectReason() : null)
                .updateTime(new Date())
                .build();
        if (action == 2) {
            // 审核通过 → 同时标记已发布
            update.setIsPublished(true);
        }
        int rows = articleDao.updateById(update);
        return rows > 0 ? Response.success() : Response.fail("审核操作失败");
    }

}
