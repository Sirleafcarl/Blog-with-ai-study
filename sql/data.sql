-- 管理员 (登录账号/密码 : admin/admin)
INSERT INTO `weblog`.`t_user` (`id`, `username`, `password`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 'admin', '$2a$10$aGGgbab8HdmfxixuTwIYnOZxPH9hzrQuq1oRfLa91mVzSaRfgmtcu', '2023-07-03 11:57:18', '2023-07-08 08:24:36', 0);
-- 游客 (登录账号/密码 : test/test)
INSERT INTO `weblog`.`t_user` (`id`, `username`, `password`, `create_time`, `update_time`, `is_deleted`) VALUES (2, 'test', '$2a$10$L6ce4rQsyJ1k7ZCOfN6X4e5dHLyvg2X0t9JFEZBezDq0lds79Pxja', '2023-07-07 01:22:05', '2023-07-07 01:22:05', 0);

-- 博客基础设置信息（部署完成后，可自行登录管理后台更改）
INSERT INTO `weblog`.`t_blog_setting` (`blog_name`, `author`, `introduction`, `avatar`, `github_home`, `csdn_home`, `gitee_home`, `zhihu_home`) VALUES ('Weblog', '犬小哈', '平安喜乐', 'https://img.quanxiaoha.com/quanxiaoha/2a5509abf8fe42118c17d6d18fb36a13.jpg', 'https://www.quanxiaoha.com', 'https://www.quanxiaoha.com', 'https://www.quanxiaoha.com', 'https://www.quanxiaoha.com');

-- 管理员角色
INSERT INTO `weblog`.`t_user_role` (`id`, `username`, `role`, `create_time`) VALUES (1, 'admin', 'ROLE_ADMIN', '2023-07-07 01:21:15');
-- 游客角色
INSERT INTO `weblog`.`t_user_role` (`id`, `username`, `role`, `create_time`) VALUES (2, 'test', 'ROLE_VISITOR', '2023-07-07 01:23:33');

-- ==================== 分类数据 ====================
INSERT INTO `weblog`.`t_category` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES 
(1, 'Java', '2023-07-07 10:00:00', '2023-07-07 10:00:00', 0),
(2, 'Python', '2023-07-07 10:05:00', '2023-07-07 10:05:00', 0),
(3, 'Web开发', '2023-07-07 10:10:00', '2023-07-07 10:10:00', 0),
(4, '数据库', '2023-07-07 10:15:00', '2023-07-07 10:15:00', 0),
(5, '学习笔记', '2023-07-08 09:00:00', '2023-07-08 09:00:00', 0);

-- ==================== 标签数据 ====================
-- ==================== 标签数据 ====================
INSERT INTO `weblog`.`t_tag` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES 
(1, 'Spring', '2023-07-07 10:00:00', '2023-07-07 10:00:00', 0),
(2, 'SpringBoot', '2023-07-07 10:05:00', '2023-07-07 10:05:00', 0),
(3, 'MySQL', '2023-07-07 10:10:00', '2023-07-07 10:10:00', 0),
(4, 'Vue.js', '2023-07-07 10:15:00', '2023-07-07 10:15:00', 0),
(5, 'AI', '2023-07-08 09:00:00', '2023-07-08 09:00:00', 0),
(6, 'LLM', '2023-07-08 09:05:00', '2023-07-08 09:05:00', 0);

-- ==================== 文章数据 ====================
-- ==================== 文章数据 ====================
INSERT INTO `weblog`.`t_article` (`id`, `title`, `title_image`, `description`, `create_time`, `update_time`, `is_deleted`, `is_publish`) VALUES 
(1, 'Spring Boot 实战教程', 'https://via.placeholder.com/400x300?text=SpringBoot', 'Spring Boot 是一个用于简化 Spring 应用开发的框架，本文讲解其核心特性', '2023-07-07 10:00:00', '2023-07-07 10:00:00', 0, 1),
(2, 'Vue.js 3 快速上手', 'https://via.placeholder.com/400x300?text=Vue3', 'Vue.js 3 带来了 Composition API，让我们一起学习新的开发方式', '2023-07-07 11:00:00', '2023-07-07 11:00:00', 0, 1),
(3, 'MySQL 性能优化指南', 'https://via.placeholder.com/400x300?text=MySQL', '深入探讨 MySQL 的性能优化技巧，包括索引、查询优化等', '2023-07-07 12:00:00', '2023-07-07 12:00:00', 0, 1),
(4, 'AI 大模型最新进展', 'https://via.placeholder.com/400x300?text=AI', '总结 2023 年 AI 大模型的最新发展和应用场景', '2023-07-08 09:00:00', '2023-07-08 09:00:00', 0, 1),
(5, 'Python 数据处理实战', 'https://via.placeholder.com/400x300?text=Python', '使用 Pandas 和 NumPy 进行高效的数据处理和分析', '2023-07-08 10:00:00', '2023-07-08 10:00:00', 0, 1);

-- ==================== 文章内容数据 ====================
INSERT INTO `weblog`.`t_article_content` (`article_id`, `content`) VALUES 
(1, '# Spring Boot 实战教程\n\n## 简介\nSpring Boot 是现代 Java 开发最流行的框架之一。\n\n## 核心特性\n- 自动配置\n- 内嵌 Tomcat\n- starter 依赖\n- 开箱即用\n\n## 快速开始\n```java\n@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}\n```'),
(2, '# Vue.js 3 快速上手\n\n## Composition API\nVue 3 引入了 Composition API，提供了更灵活的逻辑复用方式。\n\n## 基础用法\n```javascript\nimport { ref } from \"vue\"\nexport default {\n  setup() {\n    const count = ref(0)\n    return { count }\n  }\n}\n```\n\n## 生命周期\n- onMounted\n- onUpdated\n- onUnmounted'),
(3, '# MySQL 性能优化指南\n\n## 索引优化\n- 选择合适的索引类型\n- 避免全表扫描\n- 使用 EXPLAIN 分析查询\n\n## 查询优化\n- 避免 SELECT *\n- 合理使用 JOIN\n- 考虑查询缓存'),
(4, '# AI 大模型最新进展\n\n## ChatGPT 的影响\nOpenAI 发布的 ChatGPT 掀起了 AI 热潮。\n\n## 国内大模型\n- 文心一言\n- 讯飞星火\n- 百川 AI\n\n## 应用前景\nAI 将深刻改变软件开发和人们的生活方式。'),
(5, '# Python 数据处理实战\n\n## Pandas 基础\n```python\nimport pandas as pd\ndf = pd.read_csv(\"data.csv\")\ndf.head()\n```\n\n## NumPy 操作\n```python\nimport numpy as np\narr = np.array([1, 2, 3])\n```');

-- ==================== 文章-分类关联 ====================
-- ==================== 文章-分类关联 ====================
INSERT INTO `weblog`.`t_article_category_rel` (`article_id`, `category_id`) VALUES 
(1, 1), (1, 3),  -- Spring Boot 属于 Java 和 Web开发
(2, 3),          -- Vue.js 属于 Web开发
(3, 4),          -- MySQL 属于 数据库
(4, 5),          -- AI 属于 学习笔记
(5, 2), (5, 5);  -- Python 属于 Python 和 学习笔记

-- ==================== 文章-标签关联 ====================
-- ==================== 文章-标签关联 ====================
INSERT INTO `weblog`.`t_article_tag_rel` (`article_id`, `tag_id`) VALUES 
(1, 1), (1, 2),  -- Spring Boot 标签
(2, 4),          -- Vue.js 标签
(3, 3),          -- MySQL 标签
(4, 5), (4, 6),  -- AI 和 LLM 标签
(5, 1);          -- Spring 标签
