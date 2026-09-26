package com.brunsoares.app.product.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;

import com.brunsoares.app.product.Product;
import com.brunsoares.app.product.interfaces.ProductImpl;
import com.brunsoares.app.product.interfaces.ProductPersistence;

public class ProductServiceTest {
    private ProductPersistence productPersistence;

    @Before
    public void setUp() {
        // Mock sobre a interface ProductPersistence
        this.productPersistence = mock(ProductPersistence.class);
    }

    @Test
    public void shouldGetProduct() {
        ProductService productService = new ProductService(this.productPersistence);
        Product product = new Product("123", "Product 1", 10.0);
        // Configure o comportamento do mock para retornar o produto
        when(this.productPersistence.get("123")).thenReturn(product);

        // Chame o método get do ProductService
        ProductImpl result = productService.get("123");

        // Verificações do persistence - Valores
        assertEquals("123", result.getID());
        assertEquals("Product 1", result.getName());
        assertEquals(10.0, result.getPrice(), 0.0);

        // Verificações do persistence - Interação com o mock
        verify(this.productPersistence).get("123");
    }

    @Test
    public void shouldCreateProduct() {
        ProductService productService = new ProductService(this.productPersistence);

        // Chame o método create do ProductService
        productService.create("Product 1", 10.0);

        // Guarda o do argumento capturado no verify
        ArgumentCaptor<ProductImpl> productCaptor = ArgumentCaptor.forClass(ProductImpl.class);

        // Verificações do persistence - Interação com o mock
        verify(this.productPersistence).save(productCaptor.capture());

        // Verificações do persistence - Valores
        assertEquals("Product 1", productCaptor.getValue().getName());
        assertEquals(10.0, productCaptor.getValue().getPrice(), 0.0);

    }

    @Test
    public void shouldNotCreateProductWithInvalidName() {
        ProductService productService = new ProductService(this.productPersistence);

        try {
            // Chame o método create do ProductService com nome inválido
            productService.create("", 10.0);
        } catch (RuntimeException e) {
            // Verifique se a exceção lançada é a esperada
            assertEquals("Name is required", e.getCause().getMessage());
        }
    }

    @Test
    public void shouldEnableProduct() {
        ProductService productService = new ProductService(this.productPersistence);
        Product product = new Product("123", "Product 1", 10.0);

        // Chame o método enable do ProductService
        productService.enable(product);

        // Guarda o do argumento capturado no verify
        ArgumentCaptor<ProductImpl> productCaptor = ArgumentCaptor.forClass(ProductImpl.class);

        // Verificações do persistence - Interação com o mock
        verify(this.productPersistence).save(productCaptor.capture());

        // Verificações do persistence - Valores
        assertEquals("enabled", productCaptor.getValue().getStatus().getValue());
    }

    @Test
    public void shouldNotEnableProductWithInvalidPrice() {
        ProductService productService = new ProductService(this.productPersistence);
        Product product = new Product("123", "Product 1", 0.0);

        try {
            // Chame o método enable do ProductService com preço inválido
            productService.enable(product);
        } catch (RuntimeException e) {
            // Verifique se a exceção lançada é a esperada
            assertEquals("Price must be greater than zero to enable the product", e.getCause().getMessage());
        }
    }

    @Test
    public void shouldDisableProduct() {
        ProductService productService = new ProductService(this.productPersistence);
        Product product = new Product("123", "Product 1", 0.0);

        // Chame o método disable do ProductService
        productService.disable(product);

        // Guarda o do argumento capturado no verify
        ArgumentCaptor<ProductImpl> productCaptor = ArgumentCaptor.forClass(ProductImpl.class);

        // Verificações do persistence - Interação com o mock
        verify(this.productPersistence).save(productCaptor.capture());

        // Verificações do persistence - Valores
        assertEquals("disabled", productCaptor.getValue().getStatus().getValue());
    }

    @Test
    public void shouldNotDisableProductWithInvalidPrice() {
        ProductService productService = new ProductService(this.productPersistence);
        Product product = new Product("123", "Product 1", 10.0);

        try {
            // Chame o método disable do ProductService com preço inválido
            productService.disable(product);
        } catch (RuntimeException e) {
            // Verifique se a exceção lançada é a esperada
            assertEquals("Price must be zero to disable the product", e.getCause().getMessage());
        }
    }
}
