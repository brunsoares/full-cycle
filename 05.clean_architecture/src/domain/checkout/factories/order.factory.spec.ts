import { describe, expect, it } from '@jest/globals';
import { OrderFactory } from './order.factory';

describe('Order Factory unit tests', () => {
	it('should create a order', () => {
		const orderProps = {
			id: '1',
			customerId: '1',
			items: [
				{
					id: '1',
					productId: '1',
					name: 'Product 1',
					quantity: 1,
					price: 100,
				},
			],
		};

		const order = OrderFactory.createOrder(orderProps);

		expect(order.id).toBe(orderProps.id);
		expect(order.customerId).toBe(orderProps.customerId);
		expect(order.items.length).toBe(orderProps.items.length);
		expect(order.items[0].id).toBe(orderProps.items[0].id);
		expect(order.items[0].productId).toBe(orderProps.items[0].productId);
		expect(order.items[0].name).toBe(orderProps.items[0].name);
		expect(order.items[0].quantity).toBe(orderProps.items[0].quantity);
		expect(order.items[0].price).toBe(orderProps.items[0].price);
	});
});
