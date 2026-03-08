package com.sirleaf.cheese.admin.service.impl;

import com.sirleaf.cheese.admin.model.vo.file.UploadFileRspVO;
import com.sirleaf.cheese.admin.service.AdminFileService;
import com.sirleaf.cheese.admin.utils.MinioUtil;
import com.sirleaf.cheese.common.Response;
import com.sirleaf.cheese.common.enums.ResponseCodeEnum;
import com.sirleaf.cheese.common.exception.BizException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
@Slf4j
public class AdminFileServiceImpl implements AdminFileService {

    @Autowired
    private MinioUtil minioUtil;

    @Override
    public Response uploadFile(MultipartFile file) {
        try {
            String url = minioUtil.uploadFile(file);
            return Response.success(UploadFileRspVO.builder().url(url).build());
        } catch (Exception e) {
            log.error("==> 上传文件异常: ", e);
            throw new BizException(ResponseCodeEnum.UPLOAD_FILE_ERROR);
        }
    }
}
