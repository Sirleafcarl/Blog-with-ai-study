package com.sirleaf.cheese.jwt;

import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.enums.ResponseCodeEnum;
import com.sirleaf.cheese.jwt.utils.ResultUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
@Slf4j
public class RestAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.warn("", accessDeniedException);
        ResultUtil.ok(response, Response.fail(ResponseCodeEnum.FORBIDDEN));
    }
}
