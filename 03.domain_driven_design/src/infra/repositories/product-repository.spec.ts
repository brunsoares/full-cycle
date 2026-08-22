import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { ProductModel } from '../db/sequelize/model/product.model';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../domain/entities/product';
import { ProductRepository } from './product-repository';

describe('Product Repository unit tests', () => {
	let sequelize: Sequelize;

	/**
	 * Executa antes de cada teste, criando uma nova instância do Sequelize e sincronizando o banco de dados em memória
	 */
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	/**
	 * Executa após cada teste, fechando a conexão com o banco de dados em memória
	 */
	afterEach(async () => {
		await sequelize.close();
	});

	/**
	 * Criar um novo produto no repositório e verificar se ele foi criado corretamente
	 */
	it('should create a new product and verify it was created correctly', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('1', 'Product 1', 10);

		await productRepository.save(product);

		const productModel = await ProductModel.findOne({ where: { id: '1' } });

		expect(productModel.toJSON()).toStrictEqual({
			id: '1',
			name: 'Product 1',
			price: 10,
		});
	});

	/**
	 * Atualizar um produto existente no repositório e verificar se ele foi atualizado corretamente
	 */
	it('should update an existing product and verify it was updated correctly', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('1', 'Product 1', 10);
		await productRepository.save(product);
		product.changeName('Product 1 Updated');
		product.changePrice(20);
		await productRepository.update(product);
		const productModel = await ProductModel.findOne({ where: { id: '1' } });
		const productFound = await productRepository.find('1');
		expect(productModel.toJSON()).toStrictEqual({
			id: productFound.id,
			name: productFound.name,
			price: productFound.price,
		});
	});

	/**
	 * Busca todos os produtos no repositório e verifica se eles foram encontrados corretamente
	 */
	it('should find all products and verify they were found correctly', async () => {
		const productRepository = new ProductRepository();
		const product1 = new Product('1', 'Product 1', 10);
		const product2 = new Product('2', 'Product 2', 20);
		const product3 = new Product('3', 'Product 3', 30);
		await productRepository.save(product1);
		await productRepository.save(product2);
		await productRepository.save(product3);
		const products = await productRepository.findAll();
		expect(products).toHaveLength(3);
		expect(products[0]).toStrictEqual(product1);
		expect(products[1]).toStrictEqual(product2);
		expect(products[2]).toStrictEqual(product3);
	});

	/**
	 * Busca um produto que não existe no repositório e verifica se ele lança um erro
	 */
	it('should throw an error when trying to find a product that does not exist', async () => {
		const productRepository = new ProductRepository();
		await expect(productRepository.find('1')).rejects.toThrow(
			'Product not found',
		);
	});

	/**
	 * Deleta um produto existente no repositório e verifica se ele foi deletado corretamente
	 */
	it('should delete an existing product and verify it was deleted correctly', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('1', 'Product 1', 10);
		await productRepository.save(product);
		await productRepository.delete('1');
		const productModel = await ProductModel.findOne({ where: { id: '1' } });
		expect(productModel).toBeNull();
	});
});
