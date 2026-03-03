-- Admin User Management: add is_disabled field
-- Run against `weblog` database

ALTER TABLE `t_user`
    ADD COLUMN `is_disabled` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否禁用：0=正常 1=已禁用' AFTER `is_deleted`;
