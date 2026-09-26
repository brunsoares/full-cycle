package com.brunsoares.app;

import com.brunsoares.adapters.db.ProductH2;
import com.brunsoares.app.product.Product;
import com.brunsoares.app.product.services.ProductService;

public class Main {
    public static void main(String[] args) {
        // Testes com adapter de banco de dados H2 em memória
        ProductH2 productH2 = new ProductH2();
        ProductService productService = new ProductService(productH2);

        Product product = (Product) productService.create("Product 1", 10.0);
        System.out.println("Product saved: " + product.getID() + ", " + product.getName() + ", " + product.getPrice()
                + ", " + product.getStatus().getValue());

        // Atualizando o produto
        try {
            product.changePrice(0.0);
            product.disable();
            productService.save(product);
            System.out.println(
                    "Product updated: " + product.getID() + ", " + product.getName() + ", " + product.getPrice()
                            + ", " + product.getStatus().getValue());
        } catch (Exception e) {
            System.out.println("Error updating product: " + e.getMessage());
        }
    }
}