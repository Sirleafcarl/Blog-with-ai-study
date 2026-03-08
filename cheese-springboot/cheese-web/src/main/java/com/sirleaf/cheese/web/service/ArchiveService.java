package com.sirleaf.cheese.web.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.ArticleDO;
import com.sirleaf.cheese.common.domain.dos.TagDO;
import com.sirleaf.cheese.web.model.vo.archive.QueryArchivePageListReqVO;


public interface ArchiveService extends IService<ArticleDO> {

    Response queryArchive(QueryArchivePageListReqVO queryArchivePageListReqVO);
}
