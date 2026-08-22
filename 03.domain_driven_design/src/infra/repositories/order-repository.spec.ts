import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../db/sequelize/model/product.model';
import { OrderItemsModel } from '../db/sequelize/model/order-items.model';
import { OrderModel } from '../db/sequelize/model/order.model';
import { CustomerModel } from '../db/sequelize/model/customer.model';
import { CustomerRepository } from './customer-repository';
import { Customer } from '../../domain/entities/customer';
import Address from '../../domain/entities/address';
import { ProductRepository } from './product-repository';
import { Product } from '../../domain/entities/product';
import { OrderItems } from '../../domain/entities/order-items';
import { Order } from '../../domain/entities/order';
import { OrderRepository } from './order-repository';

describe('Order Repository unit tests', () => {
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
		sequelize.addModels([
			OrderModel,
			OrderItemsModel,
			ProductModel,
			CustomerModel,
		]);
		await sequelize.sync();
	});

	/**
	 * Executa após cada teste, fechando a conexão com o banco de dados em memória
	 */
	afterEach(async () => {
		await sequelize.close();
	});

	/**
	 * Criar uma nova ordem de pedido no repositório e verificar se ela foi criada corretamente
	 */
	it('should create a new order', async () => {
		// Criamos o cliente
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Customer 1');
		const address = new Address('Street 1', 'City 1', 'State 1', 'ZipCode 1');
		customer.changeAddress(address);
		await customerRepository.save(customer);

		// Criamos o produto
		const productRepository = new ProductRepository();
		const product1 = new Product('1', 'Product 1', 10);
		const product2 = new Product('2', 'Product 2', 20);
		await productRepository.save(product1);
		await productRepository.save(product2);

		// Cria os itens do pedido
		const orderItem1 = new OrderItems(
			'1',
			product1.name,
			product1.price,
			product1.id,
			2,
		);
		const orderItem2 = new OrderItems(
			'2',
			product2.name,
			product2.price,
			product2.id,
			3,
		);

		// Criamos a ordem de pedido
		const orderRepository = new OrderRepository();
		const order = new Order('1', '123');
		order.addItem(orderItem1);
		order.addItem(orderItem2);
		await orderRepository.save(order);

		// Verificamos se a ordem de pedido foi criada corretamente
		const orderModel = await OrderModel.findOne({
			where: { id: '1' },
			include: ['items'],
		});
		expect(orderModel.toJSON()).toStrictEqual({
			id: '1',
			customer_id: '123',
			total: order.total(),
			items: [
				{
					id: orderItem1.id,
					name: orderItem1.name,
					price: orderItem1.price,
					product_id: orderItem1.productId,
					quantity: orderItem1.quantity,
					order_id: '1',
				},
				{
					id: orderItem2.id,
					name: orderItem2.name,
					price: orderItem2.price,
					product_id: orderItem2.productId,
					quantity: orderItem2.quantity,
					order_id: '1',
				},
			],
		});
	});

	/**
	 * Atualizar uma ordem de pedido existente no repositório e verificar se ela foi atualizada corretamente
	 */
	it('should update an existing order', async () => {
		// Criamos o cliente
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Customer 1');
		const address = new Address('Street 1', 'City 1', 'State 1', 'ZipCode 1');
		customer.changeAddress(address);
		await customerRepository.save(customer);

		// Criamos o produto
		const productRepository = new ProductRepository();
		const product1 = new Product('1', 'Product 1', 10);
		const product2 = new Product('2', 'Product 2', 20);
		await productRepository.save(product1);
		await productRepository.save(product2);

		// Cria os itens do pedido
		const orderItem1 = new OrderItems(
			'1',
			product1.name,
			product1.price,
			product1.id,
			2,
		);
		const orderItem2 = new OrderItems(
			'2',
			product2.name,
			product2.price,
			product2.id,
			3,
		);

		// Criamos a ordem de pedido
		const orderRepository = new OrderRepository();
		const order = new Order('1', '123');
		order.addItem(orderItem1);
		order.addItem(orderItem2);
		await orderRepository.save(order);

		// Atualizamos a ordem de pedido
		const orderItem3 = new OrderItems(
			'3',
			product1.name,
			product1.price,
			product1.id,
			4,
		);
		order.addItem(orderItem3);
		await orderRepository.update(order);

		// Verificamos se a ordem de pedido foi atualizada corretamente
		const orderModel = await OrderModel.findOne({
			where: { id: '1' },
			include: ['items'],
		});
		expect(orderModel.toJSON()).toStrictEqual({
			id: '1',
			customer_id: '123',
			total: order.total(),
			items: [
				{
					id: orderItem1.id,
					name: orderItem1.name,
					price: orderItem1.price,
					product_id: orderItem1.productId,
					quantity: orderItem1.quantity,
					order_id: '1',
				},
				{
					id: orderItem2.id,
					name: orderItem2.name,
					price: orderItem2.price,
					product_id: orderItem2.productId,
					quantity: orderItem2.quantity,
					order_id: '1',
				},
				{
					id: orderItem3.id,
					name: orderItem3.name,
					price: orderItem3.price,
					product_id: orderItem3.productId,
					quantity: orderItem3.quantity,
					order_id: '1',
				},
			],
		});
	});

	/**
	 * Busca todos os pedidos no repositório e verifica se eles foram encontrados corretamente
	 */
	it('should find all orders and verify they were found correctly', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Customer 1');
		const address = new Address('Street 1', 'City 1', 'State 1', 'ZipCode 1');
		customer.changeAddress(address);
		await customerRepository.save(customer);

		const productRepository = new ProductRepository();
		const product1 = new Product('1', 'Product 1', 10);
		const product2 = new Product('2', 'Product 2', 20);
		await productRepository.save(product1);
		await productRepository.save(product2);

		const orderItem1 = new OrderItems(
			'1',
			product1.name,
			product1.price,
			product1.id,
			2,
		);
		const orderItem2 = new OrderItems(
			'2',
			product2.name,
			product2.price,
			product2.id,
			3,
		);
		const order1 = new Order('1', '123');
		order1.addItem(orderItem1);
		const order2 = new Order('2', '123');
		order2.addItem(orderItem2);

		const orderRepository = new OrderRepository();
		await orderRepository.save(order1);
		await orderRepository.save(order2);

		const orders = await orderRepository.findAll();

		expect(orders).toHaveLength(2);
		expect(orders[0]).toStrictEqual(order1);
		expect(orders[1]).toStrictEqual(order2);
	});

	/**
	 * Deleta um pedido existente no repositório e verifica se ele foi deletado corretamente
	 */
	it('should delete an existing order and verify it was deleted correctly', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Customer 1');
		const address = new Address('Street 1', 'City 1', 'State 1', 'ZipCode 1');
		customer.changeAddress(address);
		await customerRepository.save(customer);

		const orderRepository = new OrderRepository();
		const order = new Order('1', '123');
		await orderRepository.save(order);
		await orderRepository.delete('1');

		const orderModel = await OrderModel.findOne({ where: { id: '1' } });

		expect(orderModel).toBeNull();
	});
});
