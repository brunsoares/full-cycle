import { describe, expect, it } from '@jest/globals';
import { Order } from '../entities/order';
import { OrderItems } from '../entities/order-items';

describe('Order unit tests', () => {
	/**
	 * Checa se o ID do pedido é obrigatório
	 */
	it('should throw error when id is empty', () => {
		expect(() => {
			const order = new Order('', '123');
		}).toThrow('ID é obrigatório');
	});

	/**
	 * Checa se o ID do cliente é obrigatório
	 */
	it('should throw error when customerId is empty', () => {
		expect(() => {
			const order = new Order('123', '');
		}).toThrow('ID do cliente é obrigatório');
	});

	/**
	 * Checa se o total da ordem é calculado corretamente
	 */
	it('should calculate total correctly', () => {
		const order = new Order('123', '123');
		const item1 = new OrderItems('1', 'Item 1', 10, 'p1', 1);
		const item2 = new OrderItems('2', 'Item 2', 20, 'p2', 2);
		order.addItem(item1);
		order.addItem(item2);
		expect(order.total()).toBe(50);
	});

	/**
	 * Checa se o erro é lançado quando há valores negativos
	 */
	it('should calculate total correctly when there are negative values', () => {
		const order = new Order('123', '123');
		expect(() => {
			const item1 = new OrderItems('1', 'Item 1', -10, 'p1', 1);
			const item2 = new OrderItems('2', 'Item 2', 20, 'p2', 2);
			order.addItem(item1);
			order.addItem(item2);
		}).toThrow('Não é permitido adicionar itens com preço negativo');
	});
});
