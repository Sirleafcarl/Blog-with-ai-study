package com.quanxiaoha.weblog.web.service.impl;

import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.domain.dos.NoteCategoryDO;
import com.quanxiaoha.weblog.web.dao.NoteCategoryDao;
import com.quanxiaoha.weblog.web.model.vo.notecategory.AddNoteCategoryReqVO;
import com.quanxiaoha.weblog.web.model.vo.notecategory.DeleteNoteCategoryReqVO;
import com.quanxiaoha.weblog.web.service.NoteCategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NoteCategoryServiceImpl implements NoteCategoryService {

    @Autowired
    private NoteCategoryDao noteCategoryDao;

    private String currentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    @Override
    public Response addCategory(AddNoteCategoryReqVO reqVO) {
        String username = currentUsername();
        try {
            NoteCategoryDO categoryDO = NoteCategoryDO.builder()
                    .username(username)
                    .name(reqVO.getName().trim())
                    .isDeleted(false)
                    .createTime(new Date())
                    .updateTime(new Date())
                    .build();
            noteCategoryDao.insert(categoryDO);
            log.info("==> 用户 {} 创建笔记分类: {}", username, reqVO.getName());
            return Response.success();
        } catch (DuplicateKeyException e) {
            return Response.fail("该分类名称已存在");
        }
    }

    @Override
    public Response deleteCategory(DeleteNoteCategoryReqVO reqVO) {
        String username = currentUsername();
        NoteCategoryDO exist = noteCategoryDao.queryById(reqVO.getId(), username);
        if (exist == null) {
            return Response.fail("分类不存在或无权删除");
        }
        noteCategoryDao.deleteById(reqVO.getId(), username);
        return Response.success();
    }

    @Override
    public Response listCategories() {
        String username = currentUsername();
        List<NoteCategoryDO> list = noteCategoryDao.queryListByUsername(username);
        List<java.util.Map<String, Object>> result = list.stream().map(c -> {
            java.util.Map<String, Object> map = new java.util.LinkedHashMap<>();
            map.put("id", c.getId());
            map.put("name", c.getName());
            return map;
        }).collect(Collectors.toList());
        return Response.success(result);
    }
}
