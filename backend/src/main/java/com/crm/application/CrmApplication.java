package com.crm.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.crm")
@EnableJpaRepositories(basePackages = "com.crm.repository")
public class CrmApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrmApplication.class, args);
        System.out.println("CRM Application started successfully!");
        System.out.println("Swagger UI: http://localhost:8080/api/swagger-ui.html");
    }
}
