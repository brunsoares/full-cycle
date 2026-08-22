import { Order } from '../../domain/entities/order';
import { OrderItems } from '../../domain/entities/order-items';
import { OrderRepositoryInterface } from '../../domain/repositories/order-repository.interface';
import { OrderItemsModel } from '../db/sequelize/model/order-items.model';
import { OrderModel } from '../db/sequelize/model/order.model';

export class OrderRepository implements OrderRepositoryInterface<Order> {
	async save(entity: Order): Promise<void> {
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
				include: [{ model: OrderItemsModel }],
			},
		);
	}
	async update(entity: Order): Promise<void> {
		await OrderModel.update(
			{
				total: entity.total(),
			},
			{
				where: {
					id: entity.id,
				},
			},
		);

		await OrderItemsModel.destroy({
			where: {
				order_id: entity.id,
			},
		});

		await OrderItemsModel.bulkCreate(
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
		return await OrderModel.findOne({ where: { id } }).then((orderModel) => {
			if (!orderModel) {
				throw new Error('Order not found');
			}
			const order = new Order(orderModel.id, orderModel.customer_id);
			orderModel.items.forEach((item) =>
				order.addItem(
					new OrderItems(
						item.id,
						item.name,
						item.price,
						item.product_id,
						item.quantity,
					),
				),
			);
			return order;
		});
	}
	async findAll(): Promise<Order[]> {
		return await OrderModel.findAll({
			include: [{ model: OrderItemsModel }],
		}).then((orderModels) => {
			return orderModels.map((orderModel) => {
				const order = new Order(orderModel.id, orderModel.customer_id);
				orderModel.items.forEach((item) =>
					order.addItem(
						new OrderItems(
							item.id,
							item.name,
							item.price,
							item.product_id,
							item.quantity,
						),
					),
				);
				order.total();
				return order;
			});
		});
	}
	async delete(id: string): Promise<void> {
		await OrderModel.destroy({ where: { id } });
	}
}
