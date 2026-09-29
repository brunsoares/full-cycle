package com.brunsoares.adapters.cli;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;

import com.brunsoares.app.product.Product;
import com.brunsoares.app.product.interfaces.ProductServiceImpl;

public class ProductCliTest {
    private ProductServiceImpl productService;

    @Before
    public void setUp() {
        // Mock sobre a interface ProductServiceImpl
        // Pois queremos testar apenas a classe ProductCli, sem depender da
        // implementação real do ProductServiceImpl
        this.productService = mock(ProductServiceImpl.class);
    }

    @Test
    public void shouldRunCreateAction() {
        ProductCli productCli = new ProductCli();
        Product product = new Product("123", "Product 1", 10.0);
        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.create(product.getName(), product.getPrice())).thenReturn(product);

        // Chame o método run com a ação "create"
        String result = productCli.run(productService, "create", null, product.getName(), product.getPrice());

        // Verifica se o método create do ProductServiceImpl foi chamado corretamente
        verify(productService).create(product.getName(), product.getPrice());

        // Verifica se o resultado retornado é o esperado
        String expectedOutput = "Product created: " + product.getID() + ", Name: " + product.getName() + ", Price: "
                + product.getPrice() + ", Status: " + product.getStatus();
        assertEquals(expectedOutput, result);
    }

    @Test
    public void shouldRunGetAction() {
        ProductCli productCli = new ProductCli();
        Product product = new Product("123", "Product 1", 10.0);
        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.get(product.getID())).thenReturn(product);

        // Chame o método run com a ação "get"
        String result = productCli.run(productService, "get", product.getID(), null, 0.0);

        // Verifica se o método get do ProductServiceImpl foi chamado corretamente
        verify(productService).get(product.getID());

        // Verifica se o resultado retornado é o esperado
        String expectedOutput = "Product retrieved: " + product.getID() + ", Name: " + product.getName() + ", Price: "
                + product.getPrice() + ", Status: " + product.getStatus();
        assertEquals(expectedOutput, result);
    }

    @Test
    public void shouldRunUpdateAction() {
        ProductCli productCli = new ProductCli();
        Product product = new Product("123", "Product 1", 10.0);
        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.get(product.getID())).thenReturn(product);

        // Chame o método run com a ação "update"
        String result = productCli.run(productService, "update", product.getID(), null, 50.0);

        // Verifica se o método get do ProductServiceImpl foi chamado corretamente
        verify(productService).get(product.getID());
        verify(productService).save(product);

        // Verifica se o resultado retornado é o esperado
        String expectedOutput = "Product updated: " + product.getID() + ", Name: " + product.getName() + ", Price: "
                + product.getPrice() + ", Status: " + product.getStatus();
        assertEquals(expectedOutput, result);
    }

    @Test
    public void shouldRunEnableAction() {
        ProductCli productCli = new ProductCli();
        Product product = new Product("123", "Product 1", 10.0);
        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.get(product.getID())).thenReturn(product);
        when(productService.enable(product)).thenReturn(product);

        // Chame o método run com a ação "enable"
        String result = productCli.run(productService, "enable", product.getID(), null, 0.0);

        // Verifica se os métodos get e enable do ProductServiceImpl foram chamados
        // corretamente
        verify(productService).get(product.getID());
        verify(productService).enable(product);

        // Verifica se o resultado retornado é o esperado
        String expectedOutput = "Product enabled: " + product.getID() + ", Name: " + product.getName() + ", Price: "
                + product.getPrice() + ", Status: " + product.getStatus();
        assertEquals(expectedOutput, result);
    }

    @Test
    public void shouldRunDisableAction() {
        ProductCli productCli = new ProductCli();
        Product product = new Product("123", "Product 1", 10.0);
        // Configurando o comportamento do mock para retornar o valor desejado
        when(productService.get(product.getID())).thenReturn(product);
        when(productService.disable(product)).thenReturn(product);

        // Chame o método run com a ação "disable"
        String result = productCli.run(productService, "disable", product.getID(), null, 0.0);

        // Verifica se os métodos get e disable do ProductServiceImpl foram chamados
        // corretamente
        verify(productService).get(product.getID());
        verify(productService).disable(product);

        // Verifica se o resultado retornado é o esperado
        String expectedOutput = "Product disabled: " + product.getID() + ", Name: " + product.getName() + ", Price: "
                + product.getPrice() + ", Status: " + product.getStatus();
        assertEquals(expectedOutput, result);
    }

    @Test
    public void shouldReturnInvalidActionMessage() {
        ProductCli productCli = new ProductCli();

        // Chame o método run com uma ação inválida
        String result = productCli.run(productService, "invalidAction", null, null, 0.0);

        // Verifica se o resultado retornado é a mensagem de ação inválida
        String expectedOutput = "Invalid action. Please use 'create', 'get', 'enable', or 'disable'.";
        assertEquals(expectedOutput, result);
    }
}
