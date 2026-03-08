package com.sirleaf.cheese.web.service;

import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.web.model.vo.article.QueryUserArticlePageListReqVO;
import com.sirleaf.cheese.web.model.vo.article.SubmitUserArticleReqVO;
import com.sirleaf.cheese.web.model.vo.article.UpdateUserArticleReqVO;

public interface UserArticleService {
    /** 投稿（提交审核）或保存草稿 */
    Response submitArticle(SubmitUserArticleReqVO reqVO);

    /** 修改自己的文章（仅草稿/已拒绝状态可改） */
    Response updateArticle(UpdateUserArticleReqVO reqVO);

    /** 删除自己的文章 */
    Response deleteArticle(Long articleId);

    /** 获取自己的文章分页列表 */
    Response getMyArticleList(QueryUserArticlePageListReqVO reqVO);

    /** 获取自己某篇文章的详情 */
    Response getMyArticleDetail(Long articleId);
}
