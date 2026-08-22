import { Column, PrimaryKey, Table, Model } from 'sequelize-typescript';

/**
 * Representa o modelo de produto no banco de dados usando Sequelize
 */
@Table({
	tableName: 'customer',
	timestamps: false,
})
export class CustomerModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@Column({ allowNull: false })
	declare name: string;

	@Column({ allowNull: false })
	declare street: string;

	@Column({ allowNull: false })
	declare city: string;

	@Column({ allowNull: false })
	declare state: string;

	@Column({ allowNull: false })
	declare zipCode: string;

	@Column({ allowNull: false })
	declare active: boolean;

	@Column
	declare rewardPoints: number;
}
