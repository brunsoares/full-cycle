package com.brunsoares.app.product;

import com.brunsoares.app.product.enums.StatusProduct;
import com.brunsoares.app.product.interfaces.ProductImpl;

public class Product implements ProductImpl {
    private String id;
    private String name;
    private double price;
    private StatusProduct status;

    public Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.status = StatusProduct.DISABLED;
    }

    @Override
    public boolean isValid() throws Exception {
        if (this.name == null || this.name.isEmpty()) {
            throw new Exception("Name is required");
        }
        if (this.price < 0) {
            throw new Exception("Price must be greater than or equal to zero");
        }
        return true;
    }

    @Override
    public void enable() throws Exception {
        if (this.price > 0) {
            this.status = StatusProduct.ENABLED;
        } else {
            throw new Exception("Price must be greater than zero to enable the product");
        }
    }

    @Override
    public void disable() throws Exception {
        if (this.price == 0) {
            this.status = StatusProduct.DISABLED;
        } else {
            throw new Exception("Price must be zero to disable the product");
        }
    }

    @Override
    public void changePrice(double price) throws Exception {
        if (price < 0) {
            throw new Exception("Price must be greater than or equal to zero");
        }
        this.price = price;
    }

    @Override
    public String getID() {
        return this.id;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public StatusProduct getStatus() {
        return this.status;
    }

    @Override
    public double getPrice() {
        return this.price;
    }

}
