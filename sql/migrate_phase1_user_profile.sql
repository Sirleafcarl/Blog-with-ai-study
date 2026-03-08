-- Phase 1: 用户资料字段扩展
-- 执行前请确保已连接 cheese 数据库

ALTER TABLE `t_user`
    ADD COLUMN `nickname` varchar(60)  DEFAULT NULL COMMENT '昵称' AFTER `username`,
    ADD COLUMN `avatar`   varchar(256) DEFAULT NULL COMMENT '用户头像URL' AFTER `nickname`,
    ADD COLUMN `email`    varchar(128) DEFAULT NULL COMMENT '邮箱' AFTER `avatar`,
    ADD COLUMN `bio`      varchar(256) DEFAULT NULL COMMENT '个人简介' AFTER `email`;
