package com.sirleaf.cheese.web.controller;

import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.aspect.ApiOperationLog;
import com.sirleaf.cheese.web.model.vo.archive.QueryArchivePageListReqVO;
import com.sirleaf.cheese.web.model.vo.article.QueryIndexArticlePageListReqVO;
import com.sirleaf.cheese.web.model.vo.article.QueryTagArticlePageListReqVO;
import com.sirleaf.cheese.web.service.ArchiveService;
import com.sirleaf.cheese.web.service.ArticleService;
import com.sirleaf.cheese.web.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/archive")
public class ArchiveController {

    @Autowired
    private ArchiveService archiveService;

    @PostMapping("/list")
    @ApiOperationLog(description = "获取文章归档列表")
    public Response queryArchive(@RequestBody QueryArchivePageListReqVO queryArchivePageListReqVO) {
        return archiveService.queryArchive(queryArchivePageListReqVO);
    }

}
