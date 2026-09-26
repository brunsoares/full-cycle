package com.brunsoares.adapters.db;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.brunsoares.app.product.Product;

public class ProductH2Test {
    private final String url = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1";
    private final String user = "sa";
    private final String password = "";
    private Connection db;

    @Before
    public void setUp() {
        try {
            db = DriverManager.getConnection(url, user, password);
            ProductH2 productH2 = new ProductH2();
            productH2.createTableIfNotExists();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @After
    public void tearDown() {
        try {
            if (db != null && !db.isClosed()) {
                db.close();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void shouldCreateTableIfNotExists() {
        try {
            Statement statement = db.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM products");
            resultSet.close();
            statement.close();
            assertTrue(true);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void shouldSaveProduct() throws Exception {
        ProductH2 productH2 = new ProductH2();
        Product product = new Product("1", "Product 1", 10.0);
        product.enable();
        productH2.save(product);

        try {
            Statement statement = db.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM products WHERE id = '1'");
            assertTrue(resultSet.next());
            assertEquals("Product 1", resultSet.getString("name"));
            assertEquals(10.0, resultSet.getDouble("price"), 0.0);
            assertEquals("enabled", resultSet.getString("status"));
            resultSet.close();
            statement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void shouldUpdateProduct() throws Exception {
        ProductH2 productH2 = new ProductH2();
        Product product = new Product("1", "Product 1", 10.0);
        product.enable();
        productH2.save(product);

        // Update the product
        product.changePrice(0.0);
        product.disable();
        productH2.save(product);

        try {
            Statement statement = db.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM products WHERE id = '1'");
            assertTrue(resultSet.next());
            assertEquals("Product 1", resultSet.getString("name"));
            assertEquals(0.0, resultSet.getDouble("price"), 0.0);
            assertEquals("disabled", resultSet.getString("status"));
            resultSet.close();
            statement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void shouldGetProductById() {
        ProductH2 productH2 = new ProductH2();
        Product product = new Product("123", "Product 1", 0);
        productH2.save(product);

        Product retrievedProduct = (Product) productH2.get("123");
        assertEquals("123", retrievedProduct.getID());
        assertEquals("Product 1", retrievedProduct.getName());
        assertEquals(0, retrievedProduct.getPrice(), 0.0);
        assertEquals("disabled", retrievedProduct.getStatus().getValue());
    }
}
