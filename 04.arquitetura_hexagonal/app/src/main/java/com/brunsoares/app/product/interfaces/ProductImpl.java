package com.brunsoares.app.product.interfaces;

import com.brunsoares.app.product.enums.StatusProduct;

public interface ProductImpl {
    boolean isValid() throws Exception;

    void enable() throws Exception;

    void disable() throws Exception;

    String getID();

    String getName();

    StatusProduct getStatus();

    double getPrice();
}
