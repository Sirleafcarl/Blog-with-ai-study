package com.sirleaf.cheese.web.service;

import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.web.model.vo.archive.QueryArchivePageListReqVO;
import com.sirleaf.cheese.web.model.vo.article.QueryArticleDetailReqVO;
import com.sirleaf.cheese.web.model.vo.article.QueryCategoryArticlePageListReqVO;
import com.sirleaf.cheese.web.model.vo.article.QueryIndexArticlePageListReqVO;
import com.sirleaf.cheese.web.model.vo.article.QueryTagArticlePageListReqVO;


public interface ArticleService {

    PageResponse queryIndexArticlePageList(QueryIndexArticlePageListReqVO queryIndexArticlePageListReqVO);

    PageResponse queryCategoryArticlePageList(QueryCategoryArticlePageListReqVO queryCategoryArticlePageListReqVO);

    Response queryArticleDetail(QueryArticleDetailReqVO queryArticleDetailReqVO);

    PageResponse queryTagArticlePageList(QueryTagArticlePageListReqVO queryTagArticlePageListReqVO);

    PageResponse searchArticle(com.sirleaf.cheese.web.model.vo.article.SearchArticleReqVO reqVO);

}
