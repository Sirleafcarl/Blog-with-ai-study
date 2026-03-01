package com.quanxiaoha.weblog.common.eventbus;


public interface EventListener {
    void handleEvent(ArticleEvent weblogEvent);
}
