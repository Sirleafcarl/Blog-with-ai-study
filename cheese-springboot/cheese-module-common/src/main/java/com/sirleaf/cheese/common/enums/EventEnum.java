package com.sirleaf.cheese.common.enums;

import com.sirleaf.cheese.common.exception.BaseExceptionInterface;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum EventEnum {

    // PV 加 1
    PV_INCREASE("PV INCREASE"),
    ;

    private String message;

}
