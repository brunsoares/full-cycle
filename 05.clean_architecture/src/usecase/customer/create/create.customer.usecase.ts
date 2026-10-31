import { v4 } from 'uuid';
import Address from '../../../domain/customer/entities/address';
import { Customer } from '../../../domain/customer/entities/customer';
import { CustomerRepositoryInterface } from '../../../domain/customer/repositories/customer-repository.interface';
import {
	CreateCustomerInputDto,
	CreateCustomerOutputDto,
} from './create.customer.dto';

export class CreateCustomerUseCase {
	private readonly customerRepository: CustomerRepositoryInterface<Customer>;
	constructor(customerRepository: CustomerRepositoryInterface<Customer>) {
		this.customerRepository = customerRepository;
	}

	async execute(
		input: CreateCustomerInputDto,
	): Promise<CreateCustomerOutputDto> {
		const customer = new Customer(v4(), input.name);
		customer.changeAddress(
			new Address(
				input.address.street,
				input.address.city,
				input.address.state,
				input.address.zip,
			),
		);
		await this.customerRepository.save(customer);
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
