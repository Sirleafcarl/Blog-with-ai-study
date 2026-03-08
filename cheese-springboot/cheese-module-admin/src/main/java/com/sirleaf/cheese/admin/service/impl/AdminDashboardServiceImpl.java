package com.sirleaf.cheese.admin.service.impl;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.sirleaf.cheese.admin.dao.AdminArticleDao;
import com.sirleaf.cheese.admin.dao.AdminCategoryDao;
import com.sirleaf.cheese.admin.dao.AdminTagDao;
import com.sirleaf.cheese.admin.dao.AdminStatisticsArticlePVDao;
import com.sirleaf.cheese.admin.model.vo.dashboard.QueryDashboardArticleStatisticsRspVO;
import com.sirleaf.cheese.admin.model.vo.dashboard.QueryDashboardPVStatisticsRspVO;
import com.sirleaf.cheese.admin.service.AdminDashboardService;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.constant.Constants;
import com.sirleaf.cheese.common.domain.dos.ArticleCountDO;
import com.sirleaf.cheese.common.domain.dos.StatisticsArticlePVDO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@Slf4j
public class AdminDashboardServiceImpl implements AdminDashboardService {

    @Autowired
    private AdminArticleDao articleDao;
    @Autowired
    private AdminCategoryDao categoryDao;
    @Autowired
    private AdminTagDao tagDao;
    @Autowired
    private AdminStatisticsArticlePVDao statisticsArticlePVDao;

    @Override
    public Response queryDashboardArticleStatisticsInfo() {
        Long articleTotalCount = articleDao.selectTotalCount();
        Long categoryTotalCount = categoryDao.selectTotalCount();
        Long tagTotalCount = tagDao.selectTotalCount();

        // 总浏览量
        List<StatisticsArticlePVDO> pvCounts = statisticsArticlePVDao.selectAllPVCount();
        Long pvTotalCount = pvCounts.stream().mapToLong(StatisticsArticlePVDO::getPvCount).sum();

        QueryDashboardArticleStatisticsRspVO queryDashboardArticleStatisticsRspVO = QueryDashboardArticleStatisticsRspVO.builder()
                .articleTotalCount(Objects.isNull(articleTotalCount) ? 0 : articleTotalCount)
                .categoryTotalCount(Objects.isNull(categoryTotalCount) ? 0 : categoryTotalCount)
                .tagTotalCount(Objects.isNull(tagTotalCount) ? 0 : tagTotalCount)
                .pvTotalCount(pvTotalCount)
                .build();

        return Response.success(queryDashboardArticleStatisticsRspVO);
    }

    @Override
    public Response queryDashboardPublishArticleStatisticsInfo() {
        // 与前端保持一致：从当前月往前推4个月作为起始，往后延2个月作为结束
        LocalDate startDate = LocalDate.now().minusMonths(4).withDayOfMonth(1);
        LocalDate endDate = LocalDate.now();

        String startDateStr = startDate.format(Constants.DATE_TIME_FORMATTER);
        String endDateStr = endDate.format(Constants.DATE_TIME_FORMATTER);

        List<ArticleCountDO> articleCountDOS = articleDao.selectArticleCount(startDateStr, endDateStr);

        Map<String, Long> dateCountMap = CollectionUtils.isEmpty(articleCountDOS)
                ? Collections.emptyMap()
                : articleCountDOS.stream().collect(Collectors.toMap(ArticleCountDO::getDate, ArticleCountDO::getCount));

        Map<String, Long> map = Maps.newLinkedHashMap();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            String key = date.format(Constants.DATE_TIME_FORMATTER);
            map.put(key, dateCountMap.getOrDefault(key, 0L));
        }

        return Response.success(map);
    }

    @Override
    public Response queryDashboardPVStatisticsInfo() {
        List<StatisticsArticlePVDO> statisticsArticlePVDOS = statisticsArticlePVDao.selectLatestWeekRecords();

        QueryDashboardPVStatisticsRspVO queryDashboardPVStatisticsRspVO = null;

        List<String> pvDates = Lists.newArrayList();
        List<Long> pvCounts = Lists.newArrayList();

        LocalDate minus7date = LocalDate.now().minusDays(7);

        for (int i = 1; i < 8; i++) {
            LocalDate plusDate = minus7date.plusDays(i);

            String dateStr = plusDate.format(DateTimeFormatter.ofPattern("MM-dd"));

            pvDates.add(dateStr);
        }

        queryDashboardPVStatisticsRspVO = QueryDashboardPVStatisticsRspVO.builder()
                .pvDates(pvDates)
                .build();

        if (!CollectionUtils.isEmpty(statisticsArticlePVDOS)) {
            DateFormat dateFormat = new SimpleDateFormat("MM-dd");
            Map<String, Long> pvDateCountMap = statisticsArticlePVDOS.stream().collect(Collectors.toMap(p -> {
                Date date = p.getPvDate();
                return dateFormat.format(date);
            }, StatisticsArticlePVDO::getPvCount));

            pvDates.forEach(pvDate -> {
                pvCounts.add(Objects.isNull(pvDateCountMap.get(pvDate)) ? 0 : pvDateCountMap.get(pvDate));
            });

            queryDashboardPVStatisticsRspVO.setPvCounts(pvCounts);
        }

        return Response.success(queryDashboardPVStatisticsRspVO);
    }
}

