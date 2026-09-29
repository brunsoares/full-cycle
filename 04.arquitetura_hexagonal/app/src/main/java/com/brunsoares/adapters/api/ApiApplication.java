package com.brunsoares.adapters.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.brunsoares.adapters.db.ProductH2;
import com.brunsoares.app.product.interfaces.ProductPersistence;
import com.brunsoares.app.product.interfaces.ProductServiceImpl;
import com.brunsoares.app.product.services.ProductService;

@SpringBootApplication
public class ApiApplication {
    @Bean
    public ProductPersistence productPersistence() {
        return new ProductH2();
    }

    @Bean
    public ProductServiceImpl productService(ProductPersistence productPersistence) {
        return new ProductService(productPersistence);
    }

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }
}
