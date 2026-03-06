-- =============================================
-- 笔记分类功能迁移脚本
-- 1. 新增 t_note_category 表（用户级笔记分类）
-- 2. t_note 表增加 category_id 字段
-- =============================================

-- 1. 创建笔记分类表
CREATE TABLE IF NOT EXISTS `t_note_category`
(
    `id`          bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类id',
    `username`    varchar(60)  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '所属用户名',
    `name`        varchar(60)  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分类名称',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted`  tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除：0否 1是',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `uni_username_name`(`username`, `name`) USING BTREE,
    INDEX         `idx_username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '笔记分类表' ROW_FORMAT = Dynamic;

-- 2. t_note 表增加 category_id 字段
ALTER TABLE `t_note` ADD COLUMN `category_id` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '分类id' AFTER `username`;
ALTER TABLE `t_note` ADD INDEX `idx_category_id`(`category_id`) USING BTREE;
