package com.sirleaf.cheese.common.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sirleaf.cheese.common.domain.dos.ArticleCountDO;
import com.sirleaf.cheese.common.domain.dos.ArticleDO;
import com.sirleaf.cheese.common.domain.dos.StatisticsArticlePVDO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface StatisticsArticlePVMapper extends BaseMapper<StatisticsArticlePVDO> {

}
