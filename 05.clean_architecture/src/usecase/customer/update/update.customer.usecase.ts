import Address from '../../../domain/customer/entities/address';
import { Customer } from '../../../domain/customer/entities/customer';
import { CustomerRepositoryInterface } from '../../../domain/customer/repositories/customer-repository.interface';
import {
	UpdateCustomerInputDto,
	UpdateCustomerOutputDto,
} from './update.customer.dto';

export class UpdateCustomerUseCase {
	private customerRepository: CustomerRepositoryInterface<Customer>;

	constructor(customerRepository: CustomerRepositoryInterface<Customer>) {
		this.customerRepository = customerRepository;
	}

	async execute(
		input: UpdateCustomerInputDto,
	): Promise<UpdateCustomerOutputDto> {
		const customer = await this.customerRepository.find(input.id);
		if (!customer) {
			throw new Error('Customer not found');
		}

		customer.changeName(input.name);
		customer.changeAddress(
			new Address(
				input.address.street,
				input.address.city,
				input.address.state,
				input.address.zip,
			),
		);

		await this.customerRepository.update(customer);

		return {
			id: customer.id,
			name: customer.name,
			address: {
				street: customer.address.street,
				city: customer.address.city,
				state: customer.address.state,
				zip: customer.address.zipCode,
			},
			active: customer.active,
			rewardPoints: customer.rewardPoints,
		};
	}
}
