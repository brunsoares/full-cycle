import { Sequelize } from 'sequelize-typescript';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import Product from '../../../../domain/product/entity/product';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import ProductModel from '../../../product/repository/sequelize/product.model';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';
import OrderRepository from './order.repository';

describe('Order repository test', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});

		await sequelize.addModels([
			CustomerModel,
			OrderModel,
			OrderItemModel,
			ProductModel,
		]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it('should create a new order', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Customer 1');
		const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product('123', 'Product 1', 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			'1',
			product.name,
			product.price,
			product.id,
			2,
		);

		const order = new Order('123', '123', [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ['items'],
		});

		expect(orderModel.toJSON()).toStrictEqual({
			id: '123',
			customer_id: '123',
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					order_id: '123',
					product_id: '123',
				},
			],
		});
	});

	it('should update an order with new items', async () => {
		// Create customer and address
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Customer 1');
		const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
		customer.changeAddress(address);
		await customerRepository.create(customer);

		// Create product
		const productRepository = new ProductRepository();
		const product = new Product('123', 'Product 1', 10);
		await productRepository.create(product);

		// Create order item
		const orderItem = new OrderItem(
			'1',
			product.name,
			product.price,
			product.id,
			2,
		);

		// Create order and link it to the customer and order item
		const order = new Order('123', '123', [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		// Create new product for the new order item
		const newProduct = new Product('456', 'Product 2', 20);
		await productRepository.create(newProduct);
		// Add new order item to the order
		const newOrderItem = new OrderItem(
			'2',
			newProduct.name,
			newProduct.price,
			newProduct.id,
			3,
		);
		const updatedOrder = new Order('123', '123', [orderItem, newOrderItem]);
		await orderRepository.update(updatedOrder);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ['items'],
		});

		// Check if the order model has been updated correctly
		expect(orderModel.toJSON()).toStrictEqual({
			id: '123',
			customer_id: '123',
			total: updatedOrder.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					order_id: '123',
					product_id: '123',
				},
				{
					id: newOrderItem.id,
					name: newOrderItem.name,
					price: newOrderItem.price,
					quantity: newOrderItem.quantity,
					order_id: '123',
					product_id: '456',
				},
			],
		});
	});

	it('should find an order by id', async () => {
		// Create customer and address
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Customer 1');
		const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
		customer.changeAddress(address);
		await customerRepository.create(customer);

		// Create product
		const productRepository = new ProductRepository();
		const product = new Product('123', 'Product 1', 10);
		await productRepository.create(product);

		// Create order item
		const orderItem = new OrderItem(
			'1',
			product.name,
			product.price,
			product.id,
			2,
		);

		// Create order and link it to the customer and order item
		const order = new Order('123', '123', [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const foundOrder = await orderRepository.find(order.id);

		expect(foundOrder).toStrictEqual(order);
	});

	it('should find all orders', async () => {
		// Create customer and address
		const customerRepository = new CustomerRepository();
		const customer = new Customer('123', 'Customer 1');
		const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
		customer.changeAddress(address);
		await customerRepository.create(customer);

		// Create product
		const productRepository = new ProductRepository();
		const product = new Product('123', 'Product 1', 10);
		await productRepository.create(product);

		// Create order item
		const orderItem = new OrderItem(
			'1',
			product.name,
			product.price,
			product.id,
			2,
		);

		// Create order and link it to the customer and order item
		const order = new Order('123', '123', [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		// Create another order with a different product
		const product2 = new Product('456', 'Product 2', 20);
		await productRepository.create(product2);

		// Create another order item
		const orderItem2 = new OrderItem(
			'2',
			product2.name,
			product2.price,
			product2.id,
			3,
		);

		// Create another order and link it to the customer and the second order item
		const order2 = new Order('456', '123', [orderItem2]);
		await orderRepository.create(order2);

		const foundOrders = await orderRepository.findAll();

		expect(foundOrders).toStrictEqual([order, order2]);
	});
});
