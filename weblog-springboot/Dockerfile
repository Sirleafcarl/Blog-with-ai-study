# ── 阶段 1：构建 ───────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /build

# 先只复制 pom 文件，利用 Docker 层缓存加速依赖下载
COPY pom.xml .
COPY weblog-module-admin/pom.xml   weblog-module-admin/
COPY weblog-module-common/pom.xml  weblog-module-common/
COPY weblog-module-jwt/pom.xml     weblog-module-jwt/
COPY weblog-web/pom.xml            weblog-web/
RUN mvn dependency:go-offline -q

# 复制源码并构建（跳过测试）
COPY . .
RUN mvn clean package -DskipTests -q

# ── 阶段 2：运行 ───────────────────────────────────────────────
FROM eclipse-temurin:17-jre
WORKDIR /app

# 添加非 root 用户以提升安全性
RUN addgroup --system weblog && adduser --system --ingroup weblog weblog
USER weblog

COPY --from=builder /build/weblog-web/target/weblog-web-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
