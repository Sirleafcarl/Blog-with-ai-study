# WeBlog

## 简介

一款基于 **Spring Boot + Vue 3.2 + Vite** 开发的前后端分离博客系统，在原有博客框架基础上进行了大量功能扩展与 UI 重构，已发展为集内容管理、用户投稿、个人笔记、AI 智能辅助于一体的综合性博客平台。

- 后端采用 Spring Boot、MyBatis Plus、MySQL、Spring Security、JWT 等；
- 前台/管理后台基于 Vue 3.2 + Vite + Element Plus + Tailwind CSS 构建，全面重设计 UI；
- 支持 Markdown 格式写作，分栏编辑界面（左侧编辑区 + 右侧元数据面板）；
- 新增用户注册、投稿审核工作流、个人主页、笔记系统；
- 集成 AI 能力：根据笔记自动生成练习题、AI 批改笔记并评分；
- 仪表盘支持文章发布热力图（ECharts）、PV 访问量统计；

---

## 功能一览

### 前台（用户端）

| 功能           | 状态 | 说明                                                       |
| -------------- | ---- | ---------------------------------------------------------- |
| 博客首页       | ✅    | 文章卡片列表、分页                                         |
| 文章详情       | ✅    | Markdown 渲染、点赞、标签、分类                            |
| 分类列表       | ✅    | 卡片网格布局，彩色图标，悬停动效                           |
| 标签云         | ✅    | 10 色标签 Pill，悬停动效                                   |
| 文章归档       | ✅    | 时间线布局，按月分组，el-pagination 分页                   |
| 站内搜索       | ✅    | 渐变英雄搜索区 + 横向卡片结果列表，支持结果页再次搜索      |
| 用户注册       | ✅    | 用户自助注册账号                                           |
| 个人主页       | ✅    | Tab 分页：我的文章 / 我的笔记 / 个人资料                   |
| 用户投稿       | ✅    | 分栏写文章界面，支持保存草稿 / 提交审核                    |
| 个人笔记       | ✅    | 笔记 CRUD、分类管理，搜索过滤                              |
| AI 生成题目    | ✅    | 基于笔记内容，AI 自动出练习题                              |
| AI 批改笔记    | ✅    | AI 阅读笔记并给出批改意见与得分                            |
| AI 历史记录    | ✅    | 查看历次 AI 出题及批改历史                                 |

### 后台（管理端）

| 功能         | 状态 | 说明                                                         |
| ------------ | ---- | ------------------------------------------------------------ |
| 登录页       | ✅    |                                                              |
| 仪表盘       | ✅    | 文章数/分类数/标签数/PV 统计卡片，发布热力图，PV 折线图      |
| 文章管理     | ✅    | 列表筛选（标题/日期/状态），分栏写文章/编辑文章全屏界面      |
| 投稿审核     | ✅    | 审核用户投稿：通过并发布 / 拒绝并说明原因                    |
| 分类管理     | ✅    | 分类 CRUD                                                    |
| 标签管理     | ✅    | 标签 CRUD                                                    |
| 评论管理     | ✅    | 评论列表                                                     |
| 用户管理     | ✅    | 用户列表                                                     |
| 笔记管理     | ✅    | 管理端笔记列表，支持 AI 生成题目 / AI 批改操作               |
| 博客设置     | ✅    | 博主基本信息（圆形头像上传）、社交链接配置                   |

---

## 技术栈

### 后端

| 框架                | 说明                     | 版本        |
| ------------------- | ------------------------ | ----------- |
| JDK                 | Java 开发工具包          | 1.8         |
| Spring Boot         | Web 应用开发框架         | 2.6.3       |
| Maven               | 项目构建工具             | 3.6.3       |
| MySQL               | 数据库                   | 5.7         |
| MyBatis Plus        | 持久层增强框架           | 3.5.2       |
| Spring Security     | 安全框架                 | 2.6.3       |
| JWT                 | 无状态认证令牌           | 0.11.2      |
| Lombok              | 消除样板代码             | 1.8.22      |
| Jackson             | JSON 序列化              | 2.13.1      |
| Hibernate Validator | 参数校验                 | 6.2.0.Final |
| Guava               | Google 工具库            | 18.0        |
| flexmark            | Markdown 解析            | 0.62.2      |

### 前端

| 框架         | 说明                            | 版本   |
| ------------ | ------------------------------- | ------ |
| Node.js      | JavaScript 运行时               | 18+    |
| Vue 3        | 渐进式前端框架                  | 3.2.47 |
| Vite         | 前端构建工具                    | 4.3.9  |
| Element Plus | Vue 3 组件库                    | 2.3.3  |
| Tailwind CSS | 原子化 CSS 框架                 | 3.x    |
| vue-router   | 路由管理                        | 4.1.6  |
| Vuex         | 状态管理                        | 4.0.2  |
| md-editor-v3 | Markdown 编辑器                 | 3.0.1  |
| axios        | HTTP 客户端                     | 1.3.5  |
| ECharts      | 数据可视化图表                  | 5.4.2  |
| moment.js    | 日期处理                        | 2.x    |

---

## 项目结构

```
WeBlog/
├── weblog-springboot/          # 后端（Maven 多模块）
│   ├── weblog-module-admin/    # 后台管理模块
│   ├── weblog-module-common/   # 通用模块（实体、Mapper、工具）
│   ├── weblog-module-jwt/      # JWT 认证授权模块
│   └── weblog-web/             # 启动入口 & 前台接口
├── weblog-vue3/                # 前端（Vue 3 + Vite）
│   └── src/
│       ├── pages/
│       │   ├── admin/          # 管理后台页面
│       │   └── frontend/       # 用户端页面
│       ├── api/                # 接口封装
│       ├── layouts/            # 布局组件（Header/Footer/Admin）
│       ├── components/         # 公共组件
│       └── store/              # Vuex 状态
└── sql/                        # 数据库脚本
    ├── schema.sql              # 建表脚本
    └── data.sql                # 初始化数据
```

---

## 快速启动

详见 [REFRESH.md](REFRESH.md)，核心步骤如下：

**后端：**
```powershell
cd weblog-springboot
mvn clean install -DskipTests
cd weblog-web/target
java -jar weblog-web-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

**前端：**
```powershell
cd weblog-vue3
npm install
npm run dev
```

访问 `http://localhost:5173`（前端开发服务器）即可预览。

默认管理员账号：`admin` / `admin`（参考 `sql/data.sql`）

---

## Docker 一键启动

```powershell
docker compose up -d --build
```

> 需要安装 Docker Desktop。首次启动因拉取镜像和构建约需 3–5 分钟。

