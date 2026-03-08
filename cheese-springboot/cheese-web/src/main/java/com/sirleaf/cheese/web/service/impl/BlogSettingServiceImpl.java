package com.sirleaf.cheese.web.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.domain.mapper.BlogSettingMapper;
import com.sirleaf.cheese.common.domain.dos.BlogSettingDO;
import com.sirleaf.cheese.web.convert.BlogSettingConvert;
import com.sirleaf.cheese.web.model.vo.blogsetting.QueryBlogSettingRspVO;
import com.sirleaf.cheese.web.service.BlogSettingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service
@Slf4j
public class BlogSettingServiceImpl extends ServiceImpl<BlogSettingMapper, BlogSettingDO> implements BlogSettingService {

    @Autowired
    private BlogSettingConvert blogSettingConvert;

    @Override
    public Response queryBlogSettingDetail() {
        BlogSettingDO blogSettingDO = getOne(null);
        return Response.success(blogSettingConvert.convert(blogSettingDO));
    }
}
