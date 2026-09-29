package com.brunsoares.adapters.api;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.brunsoares.app.product.Product;
import com.brunsoares.app.product.interfaces.ProductServiceImpl;

public class ProductControllerTest {

    private ProductServiceImpl productService;

    @Before
    public void setUp() {
        this.productService = mock(ProductServiceImpl.class);
    }

    @Test
    public void shouldCreateProduct() {
        ProductController productController = new ProductController(productService);
        Product product = new Product("123", "Product 1", 10.0);

        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.create(product.getName(), product.getPrice())).thenReturn(product);

        // Chame o método create do ProductController
        productController.create(new ProductController.ProductRequest(product.getName(), product.getPrice()));

        // Verifica se o método create do ProductServiceImpl foi chamado corretamente
        verify(productService).create(product.getName(), product.getPrice());

        // Verifica se o resultado retornado é o esperado
        assertEquals(product,
                productController.create(new ProductController.ProductRequest(product.getName(), product.getPrice())));
    }

    @Test
    public void shouldGetProduct() {
        ProductController productController = new ProductController(productService);
        Product product = new Product("123", "Product 1", 10.0);

        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.get(product.getID())).thenReturn(product);

        // Chame o método get do ProductController
        productController.get(product.getID());

        // Verifica se o método get do ProductServiceImpl foi chamado corretamente
        verify(productService).get(product.getID());

        // Verifica se o resultado retornado é o esperado
        assertEquals(product, productController.get(product.getID()));
    }

    @Test
    public void shouldUpdateProduct() throws Exception {
        ProductController productController = new ProductController(productService);
        Product product = new Product("123", "Product 1", 10.0);

        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.get(product.getID())).thenReturn(product);
        when(productService.save(product)).thenReturn(product);

        // Chame o método update do ProductController
        productController.update(product.getID(),
                new ProductController.ProductRequest(product.getName(), product.getPrice()));

        // Verifica se os métodos get e save do ProductServiceImpl foram chamados
        // corretamente
        verify(productService).get(product.getID());
        verify(productService).save(product);

        // Verifica se o resultado retornado é o esperado
        assertEquals(product, productController.update(product.getID(),
                new ProductController.ProductRequest(product.getName(), product.getPrice())));
    }

    @Test
    public void shouldEnableProduct() {
        ProductController productController = new ProductController(productService);
        Product product = new Product("123", "Product 1", 10.0);

        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.get(product.getID())).thenReturn(product);
        when(productService.enable(product)).thenReturn(product);

        // Chame o método enable do ProductController
        productController.enable(product.getID());

        // Verifica se os métodos get e enable do ProductServiceImpl foram chamados
        // corretamente
        verify(productService).get(product.getID());
        verify(productService).enable(product);

        // Verifica se o resultado retornado é o esperado
        assertEquals(product, productController.enable(product.getID()));
    }

    @Test
    public void shouldDisableProduct() {
        ProductController productController = new ProductController(productService);
        Product product = new Product("123", "Product 1", 10.0);

        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.get(product.getID())).thenReturn(product);
        when(productService.disable(product)).thenReturn(product);

        // Chame o método disable do ProductController
        productController.disable(product.getID());

        // Verifica se os métodos get e disable do ProductServiceImpl foram chamados
        // corretamente
        verify(productService).get(product.getID());
        verify(productService).disable(product);

        // Verifica se o resultado retornado é o esperado
        assertEquals(product, productController.disable(product.getID()));
    }
}
