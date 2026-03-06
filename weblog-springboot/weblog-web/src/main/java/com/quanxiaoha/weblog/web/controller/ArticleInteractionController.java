package com.quanxiaoha.weblog.web.controller;

import com.quanxiaoha.weblog.common.Response;
import com.quanxiaoha.weblog.common.aspect.ApiOperationLog;
import com.quanxiaoha.weblog.web.service.ArticleInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/article/interaction")
public class ArticleInteractionController {

    @Autowired
    private ArticleInteractionService articleInteractionService;

    @PostMapping("/like")
    @ApiOperationLog(description = "文章点赞/取消点赞")
    public Response toggleLike(@RequestBody Map<String, Long> body) {
        return articleInteractionService.toggleLike(body.get("articleId"));
    }

    @PostMapping("/favorite")
    @ApiOperationLog(description = "文章收藏/取消收藏")
    public Response toggleFavorite(@RequestBody Map<String, Long> body) {
        return articleInteractionService.toggleFavorite(body.get("articleId"));
    }

    @PostMapping("/status")
    @ApiOperationLog(description = "获取文章互动状态")
    public Response getStatus(@RequestBody Map<String, Long> body) {
        return articleInteractionService.getInteractionStatus(body.get("articleId"));
    }

    @PostMapping("/my-likes")
    @ApiOperationLog(description = "获取我的点赞文章列表")
    public Response getMyLikes(@RequestBody Map<String, Integer> body) {
        int current = body.getOrDefault("current", 1);
        int size = body.getOrDefault("size", 10);
        return articleInteractionService.getMyLikedArticles(current, size);
    }

    @PostMapping("/my-favorites")
    @ApiOperationLog(description = "获取我的收藏文章列表")
    public Response getMyFavorites(@RequestBody Map<String, Integer> body) {
        int current = body.getOrDefault("current", 1);
        int size = body.getOrDefault("size", 10);
        return articleInteractionService.getMyFavoritedArticles(current, size);
    }
}
