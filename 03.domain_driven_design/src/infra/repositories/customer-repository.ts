import Address from '../../domain/entities/address';
import { Customer } from '../../domain/entities/customer';
import { CustomerRepositoryInterface } from '../../domain/repositories/customer-repository.interface';
import { CustomerModel } from '../db/sequelize/model/customer.model';

export class CustomerRepository implements CustomerRepositoryInterface<Customer> {
	async save(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: entity.address.street,
			city: entity.address.city,
			state: entity.address.state,
			zipCode: entity.address.zipCode,
			active: entity.active,
			rewardPoints: entity.rewardPoints,
		});
	}
	async update(entity: Customer): Promise<void> {
		await CustomerModel.update(
			{
				name: entity.name,
				street: entity.address.street,
				city: entity.address.city,
				state: entity.address.state,
				zipCode: entity.address.zipCode,
				active: entity.active,
				rewardPoints: entity.rewardPoints,
			},
			{
				where: {
					id: entity.id,
				},
			},
		);
	}
	async find(id: string): Promise<Customer> {
		return await CustomerModel.findOne({ where: { id } }).then(
			(customerModel) => {
				if (!customerModel) {
					throw new Error('Customer not found');
				}
				const customer = new Customer(customerModel.id, customerModel.name);
				customer.changeAddress(
					new Address(
						customerModel.street,
						customerModel.city,
						customerModel.state,
						customerModel.zipCode,
					),
				);
				return customer;
			},
		);
	}
	async findAll(): Promise<Customer[]> {
		return await CustomerModel.findAll().then((customerModels) => {
			return customerModels.map((customerModel) => {
				const customer = new Customer(customerModel.id, customerModel.name);
				customer.changeAddress(
					new Address(
						customerModel.street,
						customerModel.city,
						customerModel.state,
						customerModel.zipCode,
					),
				);
				return customer;
			});
		});
	}
	async delete(id: string): Promise<void> {
		await CustomerModel.destroy({ where: { id } });
	}
}
