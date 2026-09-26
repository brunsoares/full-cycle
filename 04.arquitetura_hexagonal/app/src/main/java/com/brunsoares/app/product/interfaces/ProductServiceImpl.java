package com.brunsoares.app.product.interfaces;

public interface ProductServiceImpl {
    ProductImpl get(String id);

    ProductImpl create(String name, double price);

    ProductImpl save(ProductImpl product);

    ProductImpl enable(ProductImpl product);

    ProductImpl disable(ProductImpl product);
}
