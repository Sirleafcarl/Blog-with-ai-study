package com.sirleaf.cheese.admin.service;


import com.sirleaf.cheese.common.Response;

public interface AdminDashboardService {

    Response queryDashboardArticleStatisticsInfo();

    Response queryDashboardPublishArticleStatisticsInfo();

    Response queryDashboardPVStatisticsInfo();
}
