package com.sirleaf.cheese.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan({"com.sirleaf.cheese.*"})
@EnableScheduling
public class CheeseWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(CheeseWebApplication.class, args);
    }

}
