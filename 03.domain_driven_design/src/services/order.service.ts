import { Customer } from '../entities/customer';
import { Order } from '../entities/order';
import { OrderItems } from '../entities/order-items';

export class OrderService {
	/**
	 * Soma o total de todas as ordens de pedido
	 * Não guarda estado, apenas realiza uma operação com os dados fornecidos
	 * @param orders - Array de ordens de pedido
	 * @returns - Total de todas as ordens de pedido
	 */
	static sumTotalOrders(orders: Array<Order>) {
		return orders.reduce((total, order) => total + order.total(), 0);
	}

	static placeOrder(customer: Customer, items: Array<OrderItems>): Order {
		if (items.length === 0) {
			throw new Error('Não é possível criar uma ordem sem itens');
		}
		const order = new Order('1', customer.id);
		items.forEach((item) => order.addItem(item));
		customer.addRewardPoints(order.total() / 2);
		return order;
	}
}
