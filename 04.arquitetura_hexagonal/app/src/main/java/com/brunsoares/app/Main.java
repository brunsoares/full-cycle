package com.brunsoares.app;

import com.brunsoares.adapters.cli.ProductCli;
import com.brunsoares.adapters.db.ProductH2;
import com.brunsoares.app.product.Product;
import com.brunsoares.app.product.services.ProductService;

public class Main {
    public static void main(String[] args) {
        // Exemplos de uso da aplicação
        if (args.length < 1) {
            System.out.println("Usage: java Main <CLI|DB> <action> [<id>] [<name>] [<price>]");
            return;
        }
        switch (args[0]) {
            case "CLI":
                // Testes com adapter de linha de comando
                ProductCli productCli = new ProductCli();
                ProductService productServiceCreate = new ProductService(new ProductH2());
                switch (args[1]) {
                    case "create":
                        String result = productCli.run(productServiceCreate, args[1], null, args[2],
                                Double.parseDouble(args[3]));
                        System.out.println("Product created: " + result);
                        break;
                    case "get":
                        String resultGet = productCli.run(productServiceCreate, args[1], args[2], null, 0.0);
                        System.out.println("Product retrieved: " + resultGet);
                        break;
                    case "update":
                        String resultUpdate = productCli.run(productServiceCreate, args[1], args[2], null,
                                Double.parseDouble(args[3]));
                        System.out.println("Product updated: " + resultUpdate);
                        break;
                    case "enable":
                        String resultEnable = productCli.run(productServiceCreate, args[1], args[2], null, 0.0);
                        System.out.println("Product enabled: " + resultEnable);
                        break;
                    case "disable":
                        String resultDisable = productCli.run(productServiceCreate, args[1], args[2], null, 0.0);
                        System.out.println("Product disabled: " + resultDisable);
                        break;
                    default:
                        System.out.println("Invalid action. Please use 'create' or 'get'.");
                }
                break;
            case "DB":
                // Testes com adapter de banco de dados H2 em memória
                ProductH2 productH2 = new ProductH2();
                ProductService productService = new ProductService(productH2);

                Product product = (Product) productService.create("Product 1", 10.0);
                System.out
                        .println("Product saved: " + product.getID() + ", " + product.getName() + ", "
                                + product.getPrice()
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
                break;
            default:
                System.out.println("Invalid option. Please use 'CLI' or 'DB'.");
        }

    }
}