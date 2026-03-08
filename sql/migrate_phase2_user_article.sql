-- Phase 2: User Article Submission & Admin Review
-- Run this script against your `cheese` database.

ALTER TABLE `t_article`
    ADD COLUMN `author_username` varchar(60) DEFAULT NULL COMMENT '投稿用户名，NULL 表示管理员发布' AFTER `read_num`,
    ADD COLUMN `status` tinyint(2) NOT NULL DEFAULT 2 COMMENT '文章状态: 0=草稿 1=审核中 2=已发布 3=已拒绝' AFTER `author_username`,
    ADD COLUMN `reject_reason` varchar(300) DEFAULT NULL COMMENT '审核拒绝原因' AFTER `status`;

-- Existing admin-published articles keep status=2 (published)
UPDATE `t_article` SET `status` = 2 WHERE `is_deleted` = 0;

-- Optional index for status + author queries
CREATE INDEX `idx_author_status` ON `t_article` (`author_username`, `status`);
