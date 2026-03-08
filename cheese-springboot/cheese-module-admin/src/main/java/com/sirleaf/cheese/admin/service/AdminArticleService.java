package com.sirleaf.cheese.admin.service;

import com.sirleaf.cheese.admin.model.vo.article.*;
import com.sirleaf.cheese.common.Response;

import java.util.List;

public interface AdminArticleService {
    Response publishArticle(PublishArticleReqVO publishArticleReqVO);

    Response queryArticleDetail(QueryArticleDetailReqVO queryArticleDetailReqVO);

    Response queryArticlePageList(QueryArticlePageListReqVO queryArticlePageListReqVO);

    Response deleteArticle(DeleteArticleReqVO deleteArticleReqVO);

    Response updateArticle(UpdateArticleReqVO updateArticleReqVO);

    Response updateArticleTopOrPublished(UpdateArticleStatusReqVO reqVO);

    Response auditArticle(AuditArticleReqVO reqVO);

}
