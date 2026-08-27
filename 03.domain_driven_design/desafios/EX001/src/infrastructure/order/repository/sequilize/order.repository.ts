import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';

export default class OrderRepository {
	async create(entity: Order): Promise<void> {
		await OrderModel.create(
			{
				id: entity.id,
				customer_id: entity.customerId,
				total: entity.total(),
				items: entity.items.map((item) => ({
					id: item.id,
					name: item.name,
					price: item.price,
					product_id: item.productId,
					quantity: item.quantity,
				})),
			},
			{
				include: [{ model: OrderItemModel }],
			},
		);
	}

	async update(entity: Order): Promise<void> {
		// Update the order's total and customer_id in the OrderModel
		await OrderModel.update(
			{
				id: entity.id,
				customer_id: entity.customerId,
				total: entity.total(),
				items: entity.items.map((item) => ({
					id: item.id,
					name: item.name,
					price: item.price,
					product_id: item.productId,
					quantity: item.quantity,
				})),
			},
			{
				where: { id: entity.id },
			},
		);

		// Remove existing order items before adding new ones
		await OrderItemModel.destroy({
			where: { order_id: entity.id },
		});

		// Add new order items
		await OrderItemModel.bulkCreate(
			entity.items.map((item) => ({
				id: item.id,
				name: item.name,
				price: item.price,
				product_id: item.productId,
				quantity: item.quantity,
				order_id: entity.id,
			})),
		);
	}

	async find(id: string): Promise<Order> {
		// Find by id and include the items
		const orderModel = await OrderModel.findOne({
			where: { id },
			include: ['items'],
		});

		if (!orderModel) {
			throw new Error('Order not found');
		}

		const orderItems = orderModel.items.map((item) => {
			return new OrderItem(
				item.id,
				item.name,
				item.price,
				item.product_id,
				item.quantity,
			);
		});

		// Return new Order instance
		return new Order(orderModel.id, orderModel.customer_id, orderItems);
	}

	async findAll(): Promise<Order[]> {
		const orderModels = await OrderModel.findAll({
			include: ['items'],
		});

		return orderModels.map((orderModel) => {
			const orderItems = orderModel.items.map((item) => {
				return new OrderItem(
					item.id,
					item.name,
					item.price,
					item.product_id,
					item.quantity,
				);
			});

			// Return new Order instance
			return new Order(orderModel.id, orderModel.customer_id, orderItems);
		});
	}
}
