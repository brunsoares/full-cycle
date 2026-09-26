package com.brunsoares.adapters.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import com.brunsoares.app.product.Product;
import com.brunsoares.app.product.interfaces.ProductImpl;

/**
 * Exemplo de implementação de um adaptador para persistência de dados usando
 * H2 em memória.
 */
public class ProductH2 implements com.brunsoares.app.product.interfaces.ProductPersistence {
    private final String url = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1";
    private final String user = "sa";
    private final String password = "";

    /**
     * Salva um produto no banco de dados H2 em memória.
     * 
     * @param product
     * @return o produto salvo
     */
    @Override
    public ProductImpl save(ProductImpl product) {
        createTableIfNotExists();
        if (checkIfProductExists(product.getID())) {
            return update(product);
        } else {
            return create(product);
        }
    }

    /**
     * Cria um novo produto no banco de dados H2 em memória.
     * 
     * @param product
     * @return o produto criado
     */
    private ProductImpl create(ProductImpl product) {
        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO products (id, name, price, status) ");
        sql.append("VALUES (?, ?, ?, ?) ");
        try (Connection db = DriverManager.getConnection(url, user, password)) {
            PreparedStatement statement = db.prepareStatement(sql.toString());
            statement.setString(1, product.getID());
            statement.setString(2, product.getName());
            statement.setDouble(3, product.getPrice());
            statement.setString(4, product.getStatus().getValue());
            statement.executeUpdate();
            statement.close();
            return product;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Atualiza um produto existente no banco de dados H2 em memória.
     * 
     * @param product
     * @return o produto atualizado
     */
    private ProductImpl update(ProductImpl product) {
        StringBuilder sql = new StringBuilder();
        sql.append("UPDATE products SET name = ?, price = ?, status = ? ");
        sql.append("WHERE id = ?");
        try (Connection db = DriverManager.getConnection(url, user, password)) {
            PreparedStatement statement = db.prepareStatement(sql.toString());
            statement.setString(1, product.getName());
            statement.setDouble(2, product.getPrice());
            statement.setString(3, product.getStatus().getValue());
            statement.setString(4, product.getID());
            statement.executeUpdate();
            statement.close();
            return product;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Verifica se um produto com o ID fornecido já existe no banco de dados H2 em
     * memória.
     * 
     * @param id
     * @return true se o produto existir, false caso contrário
     */
    private boolean checkIfProductExists(String id) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT COUNT(*) FROM products WHERE id = ?");
        try (Connection db = DriverManager.getConnection(url, user, password)) {
            PreparedStatement statement = db.prepareStatement(sql.toString());
            statement.setString(1, id);
            ResultSet resultSet = statement.executeQuery();
            resultSet.next();
            int count = resultSet.getInt(1);
            resultSet.close();
            statement.close();
            return count > 0;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Recupera um produto do banco de dados H2 em memória pelo ID.
     * 
     * @param id
     * @return o produto encontrado ou null se não encontrado
     */
    @Override
    public ProductImpl get(String id) {
        createTableIfNotExists();
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT id, name, price, status FROM products WHERE id = ?");
        try (Connection db = DriverManager.getConnection(url, user, password)) {
            PreparedStatement statement = db.prepareStatement(sql.toString());
            statement.setString(1, id);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                String name = resultSet.getString("name");
                double price = resultSet.getDouble("price");
                String status = resultSet.getString("status");
                Product product = new Product(id, name, price);
                if ("enabled".equals(status)) {
                    product.enable();
                } else {
                    product.disable();
                }
                statement.close();
                return product;
            }
            statement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    /**
     * Cria a tabela de produtos no banco de dados H2 em memória, caso ela não
     * exista.
     */
    public void createTableIfNotExists() {
        StringBuilder sql = new StringBuilder();
        sql.append("CREATE TABLE IF NOT EXISTS products ");
        sql.append("(id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), ");
        sql.append("price DOUBLE, status VARCHAR(50))");

        try (Connection db = DriverManager.getConnection(url, user, password)) {
            Statement statement = db.createStatement();
            statement.execute(sql.toString());
            statement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
