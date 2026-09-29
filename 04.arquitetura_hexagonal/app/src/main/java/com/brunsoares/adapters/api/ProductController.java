package com.brunsoares.adapters.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brunsoares.app.product.interfaces.ProductImpl;
import com.brunsoares.app.product.interfaces.ProductServiceImpl;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductServiceImpl productService;

    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ProductImpl get(@PathVariable String id) {
        return productService.get(id);
    }

    @PostMapping
    public ProductImpl create(@RequestBody ProductRequest request) {
        return productService.create(request.name(), request.price());
    }

    @PutMapping("/{id}")
    public ProductImpl update(@PathVariable String id, @RequestBody ProductRequest request) throws Exception {
        ProductImpl product = productService.get(id);
        product.changePrice(request.price());
        return productService.save(product);
    }

    @PatchMapping("/{id}/enable")
    public ProductImpl enable(@PathVariable String id) {
        return productService.enable(productService.get(id));
    }

    @PatchMapping("/{id}/disable")
    public ProductImpl disable(@PathVariable String id) {
        return productService.disable(productService.get(id));
    }

    public record ProductRequest(String name, double price) {
    }
}
