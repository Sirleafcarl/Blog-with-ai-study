package com.quanxiaoha.weblog.common.constant;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;


public interface Constants {

    DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    DateFormat MONTH_FORMAT = new SimpleDateFormat("yyyy-MM");
}
