import {
	Column,
	PrimaryKey,
	Table,
	Model,
	ForeignKey,
	BelongsTo,
	HasMany,
} from 'sequelize-typescript';
import { CustomerModel } from './customer.model';
import { OrderItemsModel } from './order-items.model';

/**
 * Representa o modelo de order no banco de dados usando Sequelize
 */
@Table({
	tableName: 'order',
	timestamps: false,
})
export class OrderModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@Column({ allowNull: false })
	@ForeignKey(() => CustomerModel)
	declare customer_id: string;

	@BelongsTo(() => CustomerModel)
	declare customer: CustomerModel; // Informações sobre o cliente

	@HasMany(() => OrderItemsModel) // 1:N
	declare items: OrderItemsModel[]; // Informações sobre os itens do pedido

	@Column({ allowNull: false })
	declare total: number;
}
