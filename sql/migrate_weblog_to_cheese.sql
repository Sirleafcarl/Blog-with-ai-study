/*
 数据迁移脚本：从 weblog 数据库迁移到 cheese 数据库

 使用方式：打开 MySQL 命令行或 Navicat/Workbench，直接执行本文件
   mysql -u root -p < migrate_weblog_to_cheese.sql

 前提条件：weblog 数据库已存在且包含数据
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. 创建 cheese 数据库
CREATE DATABASE IF NOT EXISTS `cheese` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cheese`;

-- 2. 从 weblog 复制表结构和数据（共享表）
--    对于 weblog 中存在的表，直接 CREATE TABLE ... SELECT 复制

-- 用户表
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` LIKE `weblog`.`t_user`;
INSERT INTO `t_user` SELECT * FROM `weblog`.`t_user`;
-- 补充 cheese 新增的列（如果 weblog 中没有的话）
ALTER TABLE `t_user`
  ADD COLUMN IF NOT EXISTS `nickname` varchar(60) NULL DEFAULT NULL COMMENT '昵称' AFTER `username`,
  ADD COLUMN IF NOT EXISTS `avatar` varchar(256) NULL DEFAULT NULL COMMENT '用户头像URL' AFTER `nickname`,
  ADD COLUMN IF NOT EXISTS `email` varchar(128) NULL DEFAULT NULL COMMENT '邮箱' AFTER `avatar`,
  ADD COLUMN IF NOT EXISTS `bio` varchar(256) NULL DEFAULT NULL COMMENT '个人简介' AFTER `email`,
  ADD COLUMN IF NOT EXISTS `is_disabled` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否禁用' AFTER `is_deleted`;

-- 用户角色表
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` LIKE `weblog`.`t_user_role`;
INSERT INTO `t_user_role` SELECT * FROM `weblog`.`t_user_role`;

-- 博客设置表
DROP TABLE IF EXISTS `t_blog_setting`;
CREATE TABLE `t_blog_setting` LIKE `weblog`.`t_blog_setting`;
INSERT INTO `t_blog_setting` SELECT * FROM `weblog`.`t_blog_setting`;

-- 分类表
DROP TABLE IF EXISTS `t_category`;
CREATE TABLE `t_category` LIKE `weblog`.`t_category`;
INSERT INTO `t_category` SELECT * FROM `weblog`.`t_category`;

-- 标签表
DROP TABLE IF EXISTS `t_tag`;
CREATE TABLE `t_tag` LIKE `weblog`.`t_tag`;
INSERT INTO `t_tag` SELECT * FROM `weblog`.`t_tag`;

-- 文章表
DROP TABLE IF EXISTS `t_article`;
CREATE TABLE `t_article` LIKE `weblog`.`t_article`;
INSERT INTO `t_article` SELECT * FROM `weblog`.`t_article`;
-- 补充 cheese 新增的列
ALTER TABLE `t_article`
  ADD COLUMN IF NOT EXISTS `author_username` varchar(60) NULL DEFAULT NULL COMMENT '投稿用户名' AFTER `is_published`,
  ADD COLUMN IF NOT EXISTS `status` tinyint(2) NOT NULL DEFAULT 2 COMMENT '文章状态' AFTER `author_username`,
  ADD COLUMN IF NOT EXISTS `reject_reason` varchar(300) NULL DEFAULT NULL COMMENT '拒绝原因' AFTER `status`;

-- 文章内容表
DROP TABLE IF EXISTS `t_article_content`;
CREATE TABLE `t_article_content` LIKE `weblog`.`t_article_content`;
INSERT INTO `t_article_content` SELECT * FROM `weblog`.`t_article_content`;

-- 文章-分类映射表
DROP TABLE IF EXISTS `t_article_category_rel`;
CREATE TABLE `t_article_category_rel` LIKE `weblog`.`t_article_category_rel`;
INSERT INTO `t_article_category_rel` SELECT * FROM `weblog`.`t_article_category_rel`;

-- 文章-标签映射表
DROP TABLE IF EXISTS `t_article_tag_rel`;
CREATE TABLE `t_article_tag_rel` LIKE `weblog`.`t_article_tag_rel`;
INSERT INTO `t_article_tag_rel` SELECT * FROM `weblog`.`t_article_tag_rel`;

-- 文章PV统计表
DROP TABLE IF EXISTS `t_statistics_article_pv`;
CREATE TABLE `t_statistics_article_pv` LIKE `weblog`.`t_statistics_article_pv`;
INSERT INTO `t_statistics_article_pv` SELECT * FROM `weblog`.`t_statistics_article_pv`;

-- 评论表
DROP TABLE IF EXISTS `t_comment`;
CREATE TABLE `t_comment` LIKE `weblog`.`t_comment`;
INSERT INTO `t_comment` SELECT * FROM `weblog`.`t_comment`;

-- 3. 创建 cheese 独有的新表（weblog 中没有的）

-- 笔记分类表
CREATE TABLE IF NOT EXISTS `t_note_category`
(
    `id`          bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `username`    varchar(60) NOT NULL,
    `name`        varchar(60) NOT NULL DEFAULT '',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `is_deleted`  tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `uni_username_name`(`username`, `name`),
    INDEX `idx_username`(`username`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '笔记分类表';

-- 笔记表
CREATE TABLE IF NOT EXISTS `t_note`
(
    `id`          bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `username`    varchar(60) NOT NULL,
    `category_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
    `title`       varchar(200) NOT NULL DEFAULT '',
    `content`     longtext NULL,
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `is_deleted`  tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    INDEX `idx_username`(`username`),
    INDEX `idx_category_id`(`category_id`),
    INDEX `idx_create_time`(`create_time`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '学习笔记表';

-- 访客记录表
CREATE TABLE IF NOT EXISTS `t_visitor_record`
(
    `id`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `visitor`    VARCHAR(20) NOT NULL DEFAULT 'agent',
    `ip_address` CHAR(15) NOT NULL DEFAULT '127.0.0.1',
    `ip_region`  VARCHAR(64) NOT NULL DEFAULT '未知',
    `visit_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `is_notify`  TINYINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    KEY `ip_visit_time` (`ip_address`, `visit_time`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '访客记录表';

-- AI历史记录表
CREATE TABLE IF NOT EXISTS `t_ai_history`
(
    `id`          bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `username`    varchar(60) NOT NULL,
    `note_id`     bigint(20) UNSIGNED NOT NULL,
    `note_title`  varchar(200) NOT NULL DEFAULT '',
    `type`        varchar(20) NOT NULL,
    `content`     longtext NULL,
    `score`       int(11) NULL DEFAULT NULL,
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_username`(`username`),
    INDEX `idx_create_time`(`create_time`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'AI历史记录表';

-- 文章点赞表
CREATE TABLE IF NOT EXISTS `t_article_like`
(
    `id`          bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `article_id`  bigint(20) UNSIGNED NOT NULL,
    `username`    varchar(60) NOT NULL,
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uni_article_user` (`article_id`, `username`),
    INDEX `idx_article_id` (`article_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章点赞表';

-- 文章收藏表
CREATE TABLE IF NOT EXISTS `t_article_favorite`
(
    `id`          bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `article_id`  bigint(20) UNSIGNED NOT NULL,
    `username`    varchar(60) NOT NULL,
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uni_article_user` (`article_id`, `username`),
    INDEX `idx_article_id` (`article_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章收藏表';

SET FOREIGN_KEY_CHECKS = 1;

-- 4. 验证迁移结果
SELECT '✅ 数据迁移完成！weblog -> cheese' AS result;
SELECT '--- 迁移数据统计 ---' AS info;
SELECT 't_user' AS `表名`, COUNT(*) AS `记录数` FROM `cheese`.`t_user`
UNION ALL SELECT 't_user_role', COUNT(*) FROM `cheese`.`t_user_role`
UNION ALL SELECT 't_blog_setting', COUNT(*) FROM `cheese`.`t_blog_setting`
UNION ALL SELECT 't_category', COUNT(*) FROM `cheese`.`t_category`
UNION ALL SELECT 't_tag', COUNT(*) FROM `cheese`.`t_tag`
UNION ALL SELECT 't_article', COUNT(*) FROM `cheese`.`t_article`
UNION ALL SELECT 't_article_content', COUNT(*) FROM `cheese`.`t_article_content`
UNION ALL SELECT 't_article_category_rel', COUNT(*) FROM `cheese`.`t_article_category_rel`
UNION ALL SELECT 't_article_tag_rel', COUNT(*) FROM `cheese`.`t_article_tag_rel`
UNION ALL SELECT 't_statistics_article_pv', COUNT(*) FROM `cheese`.`t_statistics_article_pv`
UNION ALL SELECT 't_comment', COUNT(*) FROM `cheese`.`t_comment`;
