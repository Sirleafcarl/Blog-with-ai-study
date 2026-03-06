-- AI 历史记录表
CREATE TABLE IF NOT EXISTS `t_ai_history`
(
    `id`          bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `username`    varchar(60)  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
    `note_id`     bigint(20) UNSIGNED NOT NULL COMMENT '关联笔记ID',
    `note_title`  varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '笔记标题',
    `type`        varchar(20)  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型：quiz / review',
    `content`     longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'AI返回内容',
    `score`       int(11) NULL DEFAULT NULL COMMENT '答题得分（仅quiz类型）',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX         `idx_username`(`username`) USING BTREE,
    INDEX         `idx_create_time`(`create_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'AI历史记录表' ROW_FORMAT = Dynamic;
