package com.sirleaf.cheese.web.convert;

import com.sirleaf.cheese.common.constant.Constants;
import com.sirleaf.cheese.common.domain.dos.ArticleDO;
import com.sirleaf.cheese.common.domain.dos.BlogSettingDO;
import com.sirleaf.cheese.web.model.vo.article.QueryIndexArticlePageItemRspVO;
import com.sirleaf.cheese.web.model.vo.blogsetting.QueryBlogSettingRspVO;
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
