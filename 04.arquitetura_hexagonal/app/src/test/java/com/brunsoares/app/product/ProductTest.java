package com.brunsoares.app.product;

import org.junit.Assert;
import org.junit.Test;

import com.brunsoares.app.product.enums.StatusProduct;

public class ProductTest {

    @Test
    public void shouldCreateAProduct() {
        Product product = new Product("123", "Product 1", 10.0);
        Assert.assertEquals("123", product.getID());
        Assert.assertEquals("Product 1", product.getName());
        Assert.assertEquals(10.0, product.getPrice(), 0.0);
        Assert.assertEquals(StatusProduct.DISABLED, product.getStatus());
    }

    @Test
    public void shouldEnableAProduct() throws Exception {
        Product product = new Product("123", "Product 1", 10.0);
        product.enable();
        Assert.assertEquals(StatusProduct.ENABLED, product.getStatus());
    }

    @Test
    public void shouldNotEnableAProductWithZeroPrice() {
        Product product = new Product("123", "Product 1", 0.0);
        try {
            product.enable();
        } catch (Exception e) {
            Assert.assertEquals("Price must be greater than zero to enable the product", e.getMessage());
        }
    }

    @Test
    public void shouldDisableAProduct() throws Exception {
        Product product = new Product("123", "Product 1", 0.0);
        product.disable();
        Assert.assertEquals(StatusProduct.DISABLED, product.getStatus());
    }

    @Test
    public void shouldNotDisableAProductWithNonZeroPrice() {
        Product product = new Product("123", "Product 1", 10.0);
        try {
            product.disable();
        } catch (Exception e) {
            Assert.assertEquals("Price must be zero to disable the product", e.getMessage());
        }
    }

    @Test
    public void shouldValidateAProduct() throws Exception {
        Product product = new Product("123", "Product 1", 10.0);
        Assert.assertTrue(product.isValid());
    }

    @Test
    public void shouldNotValidateAProductWithInvalidName() {
        try {
            Product product = new Product("123", "", 10.0);
            product.isValid();
        } catch (Exception e) {
            Assert.assertEquals("Name is required", e.getMessage());
        }
    }

    @Test
    public void shouldNotValidateAProductWithInvalidPrice() {
        try {
            Product product = new Product("123", "Product 1", -1.0);
            product.isValid();
        } catch (Exception e) {
            Assert.assertEquals("Price must be greater than or equal to zero", e.getMessage());
        }
    }
}
