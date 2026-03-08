package com.sirleaf.cheese.web.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.dos.TagDO;


public interface TagService extends IService<TagDO> {
    Response queryTagList();
}
