package com.sirleaf.cheese.web.convert;

import com.sirleaf.cheese.common.constant.Constants;
import com.sirleaf.cheese.common.domain.dos.ArticleDO;
import com.sirleaf.cheese.web.model.vo.archive.QueryArchiveItemRspVO;
import com.sirleaf.cheese.web.model.vo.article.QueryIndexArticlePageItemRspVO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Date;
import java.util.Objects;


@Mapper(componentModel = "spring")
public interface ArticleConvert {
    ArticleConvert INSTANCE = Mappers.getMapper(ArticleConvert.class);

    @Mapping(target = "createTime", expression = "java(formatDate(bean.getCreateTime()))")
    QueryIndexArticlePageItemRspVO convert(ArticleDO bean);

    @Mapping(target = "createTime", expression = "java(formatDate(bean.getCreateTime()))")
    @Mapping(target = "createMonth", expression = "java(formatMonth(bean.getCreateTime()))")
    QueryArchiveItemRspVO convert2Archive(ArticleDO bean);

    default String formatDate(Date date) {
        if (Objects.isNull(date))
            return null;
        return Constants.DATE_FORMAT.format(date);
    }

    default String formatMonth(Date date) {
        if (Objects.isNull(date))
            return null;
        return Constants.MONTH_FORMAT.format(date);
    }

}
