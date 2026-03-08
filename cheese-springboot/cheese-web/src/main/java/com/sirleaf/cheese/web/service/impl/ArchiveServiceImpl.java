package com.sirleaf.cheese.web.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.sirleaf.cheese.common.PageResponse;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.constant.Constants;
import com.sirleaf.cheese.common.domain.dos.*;
import com.sirleaf.cheese.common.domain.mapper.ArticleMapper;
import com.sirleaf.cheese.web.convert.ArticleConvert;
import com.sirleaf.cheese.web.dao.ArticleDao;
import com.sirleaf.cheese.web.model.vo.archive.QueryArchiveItemRspVO;
import com.sirleaf.cheese.web.model.vo.archive.QueryArchivePageListReqVO;
import com.sirleaf.cheese.web.model.vo.archive.QueryArchivePageListRspVO;
import com.sirleaf.cheese.web.service.ArchiveService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;


@Service
@Slf4j
public class ArchiveServiceImpl extends ServiceImpl<ArticleMapper, ArticleDO> implements ArchiveService {

    @Autowired
    private ArticleDao articleDao;
    @Autowired
    private ArticleConvert articleConvert;

    @Override
    public Response queryArchive(QueryArchivePageListReqVO queryArchivePageListReqVO) {
        Long current = queryArchivePageListReqVO.getCurrent();
        Long size = queryArchivePageListReqVO.getSize();

        IPage<ArticleDO> articleDOIPage = articleDao.queryArticlePageList(current, size);
        List<ArticleDO> records = articleDOIPage.getRecords();

        List<QueryArchivePageListRspVO> list = Lists.newArrayList();
        List<QueryArchiveItemRspVO> itemRspVOList = null;
        if (!CollectionUtils.isEmpty(records)) {
            itemRspVOList = records.stream()
                    .map(articleDO -> articleConvert.convert2Archive(articleDO))
                    .collect(Collectors.toList());

            Map<String, List<QueryArchiveItemRspVO>> map = itemRspVOList.stream().collect(Collectors.groupingBy(QueryArchiveItemRspVO::getCreateMonth));
            Map<String, List<QueryArchiveItemRspVO>> sortedMap = new TreeMap<>(new MonthKeyComparator());
            sortedMap.putAll(map);

            sortedMap.forEach((k, v) -> list.add(QueryArchivePageListRspVO.builder().month(k).articles(v).build()));
        }
        return PageResponse.success(articleDOIPage, list);
    }

    class MonthKeyComparator implements Comparator<String> {
        @Override
        public int compare(String o1, String o2) {
            // 使用 YearMonth 类将字符串解析成日期，并根据日期进行倒序排序
            YearMonth ym1 = YearMonth.parse(o1);
            YearMonth ym2 = YearMonth.parse(o2);
            return ym2.compareTo(ym1);
        }
    }
}
