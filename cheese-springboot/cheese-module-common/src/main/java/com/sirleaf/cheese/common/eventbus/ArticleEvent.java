package com.sirleaf.cheese.common.eventbus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class ArticleEvent {
    private Long articleId;
    private String message;
}
