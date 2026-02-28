package com.quanxiaoha.weblog.web.convert;

import com.quanxiaoha.weblog.common.constant.Constants;
import com.quanxiaoha.weblog.common.domain.dos.ArticleDO;
import com.quanxiaoha.weblog.common.domain.dos.BlogSettingDO;
import com.quanxiaoha.weblog.web.model.vo.article.QueryIndexArticlePageItemRspVO;
import com.quanxiaoha.weblog.web.model.vo.blogsetting.QueryBlogSettingRspVO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Date;
import java.util.Objects;


@Mapper(componentModel = "spring")
public interface BlogSettingConvert {
    BlogSettingConvert INSTANCE = Mappers.getMapper(BlogSettingConvert.class);

    QueryBlogSettingRspVO convert(BlogSettingDO bean);


}
