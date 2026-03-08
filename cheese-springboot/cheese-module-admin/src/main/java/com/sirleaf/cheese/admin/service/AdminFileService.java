package com.sirleaf.cheese.admin.service;

import com.sirleaf.cheese.common.Response;
import org.springframework.web.multipart.MultipartFile;

public interface AdminFileService {
    Response uploadFile(MultipartFile file);
}
