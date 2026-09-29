package com.brunsoares.adapters.cli;

import com.brunsoares.app.product.interfaces.ProductImpl;
import com.brunsoares.app.product.interfaces.ProductServiceImpl;

public class ProductCli {

    public String run(ProductServiceImpl productService, String action, String id, String name, double price) {
        String result = "";
        switch (action) {
            case "create":
                ProductImpl product = productService.create(name, price);
                result = "Product created: " + product.getID() + ", Name: " + product.getName() + ", Price: "
                        + product.getPrice() + ", Status: " + product.getStatus();
                break;
            case "get":
                ProductImpl retrievedProduct = productService.get(id);
                result = "Product retrieved: " + retrievedProduct.getID() + ", Name: "
                        + retrievedProduct.getName() + ", Price: "
                        + retrievedProduct.getPrice() + ", Status: " + retrievedProduct.getStatus();
                break;
            case "update":
                ProductImpl updatedProduct = productService.get(id);
                try {
                    updatedProduct.changePrice(price);
                } catch (Exception e) {
                    result = "Error updating product: " + e.getMessage();
                    break;
                }
                productService.save(updatedProduct);
                result = "Product updated: " + updatedProduct.getID() + ", Name: " + updatedProduct.getName()
                        + ", Price: " + updatedProduct.getPrice() + ", Status: " + updatedProduct.getStatus();
                break;
            case "enable":
                ProductImpl enabledProduct = productService.enable(productService.get(id));
                result = "Product enabled: " + enabledProduct.getID() + ", Name: " + enabledProduct.getName()
                        + ", Price: "
                        + enabledProduct.getPrice() + ", Status: " + enabledProduct.getStatus();
                break;
            case "disable":
                ProductImpl disabledProduct = productService.disable(productService.get(id));
                result = "Product disabled: " + disabledProduct.getID() + ", Name: "
                        + disabledProduct.getName() + ", Price: "
                        + disabledProduct.getPrice() + ", Status: " + disabledProduct.getStatus();
                break;
            default:
                result = "Invalid action. Please use 'create', 'get', 'update', 'enable', or 'disable'.";
        }
        return result;

    }
}
