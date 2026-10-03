import { OrderProps } from '../entities/order-props.interface';
import { Order } from '../entities/order';
import { OrderItems } from '../entities/order-items';

export class OrderFactory {
	static createOrder(orderProps: OrderProps): Order {
		const order = new Order(orderProps.id, orderProps.customerId);
		orderProps.items.forEach((item) => {
			const orderItem = new OrderItems(
				item.id,
				item.name,
				item.price,
				item.productId,
				item.quantity,
			);
			order.addItem(orderItem);
		});
		return order;
	}
}
