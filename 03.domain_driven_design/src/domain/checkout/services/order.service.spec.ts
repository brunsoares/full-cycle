import { describe, expect, it } from '@jest/globals';
import { OrderItems } from '../entities/order-items';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order';
import { Customer } from '../../customer/entities/customer';

describe('Order Service unit tests', () => {
	/**
	 * Soma o total de todas as ordens de pedido
	 */
	it('should sum the total of all orders', () => {
		const order1 = new Order('1', '123');
		const item1 = new OrderItems('1', 'Item 1', 10, 'p1', 2);
		const item2 = new OrderItems('2', 'Item 2', 20, 'p2', 1);
		order1.addItem(item1);
		order1.addItem(item2);

		const order2 = new Order('2', '123');
		const item3 = new OrderItems('3', 'Item 3', 30, 'p3', 3);
		order2.addItem(item3);

		const order3 = new Order('3', '123');
		const item4 = new OrderItems('4', 'Item 4', 40, 'p4', 1);
		const item5 = new OrderItems('5', 'Item 5', 50, 'p5', 2);
		const item6 = new OrderItems('6', 'Item 6', 60, 'p6', 3);
		order3.addItem(item4);
		order3.addItem(item5);
		order3.addItem(item6);

		const orders = [order1, order2, order3];
		const total = OrderService.sumTotalOrders(orders);
		expect(total).toBe(450);
	});

	/**
	 * Cria uma ordem de pedido com itens e calcula o de pontos de recompensa do cliente
	 */
	it('should place an order', () => {
		const customer = new Customer('123', 'Customer 1');
		const item1 = new OrderItems('1', 'Item 1', 10, 'p1', 1);

		const order = OrderService.placeOrder(customer, [item1]);
		expect(customer.checkRewardPoints()).toBe(5);
		expect(order.total()).toBe(10);
	});
});
