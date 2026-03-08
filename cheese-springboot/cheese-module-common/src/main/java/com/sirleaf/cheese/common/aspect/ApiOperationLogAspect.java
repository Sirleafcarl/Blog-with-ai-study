
package com.sirleaf.cheese.common.aspect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sirleaf.cheese.common.domain.dos.VisitorRecordDO;
import com.sirleaf.cheese.common.domain.mapper.VisitorMapper;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

import static com.sirleaf.cheese.common.utils.AgentRegionUtils.getIpAddress;
import static com.sirleaf.cheese.common.utils.AgentRegionUtils.getIpRegion;


@Aspect
@Component
@Slf4j
@EnableScheduling
public class ApiOperationLogAspect {

    /**
     * 换行符
     */
    private static final String LINE_SEPARATOR = System.lineSeparator();

    /**
     * 使用线程安全的hashmap作为每天访客ip记录
     */
    private static final ConcurrentHashMap<String, String> AGENT_IP = new ConcurrentHashMap<>(8);

    /**
     * 定时更新访问ip记录 每天零点零一秒
     */
    private static final String TASK_SCHEDULE = "1 0 0 * * ?" ;

    /**
     * todo ip2region.xdb库对应的文件路径，需在配置文件中写入
     */
    @Value("${xdb.profile}")
    private String xdbPath;

    @Resource
    private VisitorMapper visitorMapper;

    /** 以所有添加 @WebLog 注解为切点 */
    @Pointcut("@annotation(com.sirleaf.cheese.common.aspect.ApiOperationLog)")
    public void apiOperationLog() {
    }

    /**
     * 在切点之前织入
     * @param joinPoint
     * @throws Throwable
     */
    @Before("apiOperationLog()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {
        // 开始打印请求日志
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        // 获取日志注解的描述信息
        String methodDescription = getAspectLogDescription(joinPoint);

        // 打印请求相关参数
        log.info("========== 请求开始: [{}], 入参: {} =================================== ", methodDescription, toJson(joinPoint));
        log.warn("请求的类: {}, 方法: {}", joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName());

        // 根据request 获取ip地址并查询归属地
        String ipAddress = getIpAddress(request);
        if (!AGENT_IP.containsKey(ipAddress)) {

            VisitorRecordDO visitorRecordDO = new VisitorRecordDO();
            String region = getIpRegion(ipAddress, xdbPath);
            // 将新的访客IP和归属地信息放入map
            AGENT_IP.put(ipAddress, region);

            Date date = new Date();
            visitorRecordDO.setVisitor("agent");
            visitorRecordDO.setIpAddress(ipAddress);
            visitorRecordDO.setIpRegion(region);
            visitorRecordDO.setVisitTime(date);
            // todo 是否邮箱通知，默认为0不通知
            visitorRecordDO.setIsNotify(0);
            visitorMapper.insert(visitorRecordDO);
            log.info("ipAddress: {}, Region: {}", ipAddress, region);

        }
    }

    /**
     * 每天零点零一秒执行，删除hashmap中的输出，更新当天访问ip记录
     */
    @Scheduled(cron = TASK_SCHEDULE)
    private void scheduledClearTask() {
        AGENT_IP.clear();
    }


    /**
     * 在切点之后织入
     * @throws Throwable
     */
    @After("apiOperationLog()")
    public void doAfter() throws Throwable {
        // nothing
    }

    /**
     * 环绕
     * @param proceedingJoinPoint
     * @return
     * @throws Throwable
     */
    @Around("apiOperationLog()")
    public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object result = proceedingJoinPoint.proceed();
        // 耗时
        long timeConsuming = System.currentTimeMillis() - startTime;
        String methodDescription = getAspectLogDescription(proceedingJoinPoint);

        log.info("========== 请求结束: [{}], 耗时: {}ms, 出参: {} =================================== {}", methodDescription, timeConsuming, safeToJson(result), LINE_SEPARATOR);
        return result;
    }

    /**
     * 获取切面注解的描述
     *
     * @param joinPoint 切点
     * @return 方法描述
     * @throws Exception
     */
    public String getAspectLogDescription(JoinPoint joinPoint)
            throws Exception {
        String targetName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] arguments = joinPoint.getArgs();
        Class targetClass = Class.forName(targetName);
        Method[] methods = targetClass.getMethods();
        StringBuilder description = new StringBuilder("");
        for (Method method : methods) {
            if (method.getName().equals(methodName)) {
                Class[] clazzs = method.getParameterTypes();
                if (clazzs.length == arguments.length) {
                    description.append(method.getAnnotation(ApiOperationLog.class).description());
                    break;
                }
            }
        }
        return description.toString();
    }

    private String safeToJson(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            return "[unserializable result]";
        }
    }

    /**
     * 转 json，跳过无法序列化的类型（如 MultipartFile）
     */
    private String toJson(JoinPoint joinPoint) {
        ObjectMapper mapper = new ObjectMapper();
        Object[] args = joinPoint.getArgs();
        java.util.List<Object> serializable = new java.util.ArrayList<>();
        for (Object arg : args) {
            if (arg instanceof MultipartFile || arg instanceof ServletRequest || arg instanceof ServletResponse) {
                serializable.add("[" + arg.getClass().getSimpleName() + "]");
            } else {
                serializable.add(arg);
            }
        }
        try {
            return mapper.writeValueAsString(serializable);
        } catch (Exception e) {
            return "[unserializable args]";
        }
    }

}
