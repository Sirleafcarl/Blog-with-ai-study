# ── 阶段 1：构建 ───────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /build

# 先只复制 pom 文件，利用 Docker 层缓存加速依赖下载
COPY pom.xml .
COPY cheese-module-admin/pom.xml   cheese-module-admin/
COPY cheese-module-common/pom.xml  cheese-module-common/
COPY cheese-module-jwt/pom.xml     cheese-module-jwt/
COPY cheese-web/pom.xml            cheese-web/
RUN mvn dependency:go-offline -q

# 复制源码并构建（跳过测试）
COPY . .
RUN mvn clean package -DskipTests -q

# ── 阶段 2：运行 ───────────────────────────────────────────────
FROM eclipse-temurin:17-jre
WORKDIR /app

# 添加非 root 用户以提升安全性
RUN addgroup --system cheese && adduser --system --ingroup cheese cheese
USER cheese

COPY --from=builder /build/cheese-web/target/cheese-web-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
