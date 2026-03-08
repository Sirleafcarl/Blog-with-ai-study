package com.sirleaf.cheese.admin.dao;

import com.sirleaf.cheese.common.domain.dos.StatisticsArticlePVDO;

import java.util.Date;
import java.util.List;

public interface AdminStatisticsArticlePVDao {
    void pvIncrease(Date currDate);

    List<StatisticsArticlePVDO> selectLatestWeekRecords();

    List<StatisticsArticlePVDO> selectAllPVCount();
}
