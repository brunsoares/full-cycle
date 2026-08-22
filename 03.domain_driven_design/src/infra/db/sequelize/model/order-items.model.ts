import {
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { OrderModel } from './order.model';

/**
 * Representa o modelo de items da ordem no banco de dados usando Sequelize
 */
@Table({
	tableName: 'order_items',
	timestamps: false,
})
export class OrderItemsModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@Column({ allowNull: false })
	@ForeignKey(() => ProductModel)
	declare product_id: string;

	@BelongsTo(() => ProductModel)
	declare product: ProductModel; // Informações sobre o produto

	@Column({ allowNull: false })
	@ForeignKey(() => OrderModel)
	declare order_id: string;

	@BelongsTo(() => OrderModel)
	declare order: OrderModel; // Informações sobre o pedido

	@Column({ allowNull: false })
	declare name: string;

	@Column({ allowNull: false })
	declare price: number;

	@Column({ allowNull: false })
	declare quantity: number;
}
