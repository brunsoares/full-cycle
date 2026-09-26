package com.brunsoares.app.product.enums;

public enum StatusProduct {
    DISABLED("disabled"),
    ENABLED("enabled");

    private final String value;

    StatusProduct(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}