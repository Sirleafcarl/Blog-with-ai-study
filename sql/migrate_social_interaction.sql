-- =============================================
-- 社区互动功能迁移脚本
-- 1. 文章点赞表
-- 2. 文章收藏表
-- =============================================

-- 1. 文章点赞表
CREATE TABLE IF NOT EXISTS `t_article_like`
(
    `id`          bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `article_id`  bigint(20) UNSIGNED NOT NULL COMMENT '文章id',
    `username`    varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `uni_article_user`(`article_id`, `username`) USING BTREE,
    INDEX         `idx_username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章点赞表' ROW_FORMAT = Dynamic;

-- 2. 文章收藏表
CREATE TABLE IF NOT EXISTS `t_article_favorite`
(
    `id`          bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `article_id`  bigint(20) UNSIGNED NOT NULL COMMENT '文章id',
    `username`    varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `uni_article_user`(`article_id`, `username`) USING BTREE,
    INDEX         `idx_username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章收藏表' ROW_FORMAT = Dynamic;
