package com.sirleaf.cheese.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sirleaf.cheese.admin.model.vo.tag.SearchTagReqVO;
import com.sirleaf.cheese.common.domain.dos.TagDO;
import com.sirleaf.cheese.admin.model.vo.tag.AddTagReqVO;
import com.sirleaf.cheese.admin.model.vo.tag.DeleteTagReqVO;
import com.sirleaf.cheese.admin.model.vo.tag.QueryTagPageListReqVO;
import com.sirleaf.cheese.common.Response;


public interface AdminTagService extends IService<TagDO> {
    Response addTags(AddTagReqVO addTagReqVO);

    Response queryTagPageList(QueryTagPageListReqVO queryTagPageListReqVO);

    Response deleteTag(DeleteTagReqVO deleteTagReqVO);

    Response searchTags(SearchTagReqVO searchTagReqVO);

    Response queryTagSelectList();
}
