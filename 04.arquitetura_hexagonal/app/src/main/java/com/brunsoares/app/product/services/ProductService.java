package com.brunsoares.app.product.services;

import java.util.UUID;

import com.brunsoares.app.product.Product;
import com.brunsoares.app.product.interfaces.ProductImpl;
import com.brunsoares.app.product.interfaces.ProductPersistence;
import com.brunsoares.app.product.interfaces.ProductServiceImpl;

public class ProductService implements ProductServiceImpl {
    private final ProductPersistence productPersistence;

    public ProductService(ProductPersistence productPersistence) {
        this.productPersistence = productPersistence;
    }

    @Override
    public ProductImpl get(String id) {
        return this.productPersistence.get(id);
    }

    @Override
    public ProductImpl create(String name, double price) {
        ProductImpl product = new Product(UUID.randomUUID().toString(), name, price);
        try {
            product.isValid();
            return this.productPersistence.save(product);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ProductImpl save(ProductImpl product) {
        try {
            product.isValid();
            return this.productPersistence.save(product);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ProductImpl enable(ProductImpl product) {
        try {
            product.enable();
            return this.productPersistence.save(product);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ProductImpl disable(ProductImpl product) {
        try {
            product.disable();
            return this.productPersistence.save(product);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
