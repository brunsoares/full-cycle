import { Customer } from '../../../domain/customer/entities/customer';
import { CustomerRepositoryInterface } from '../../../domain/customer/repositories/customer-repository.interface';
import { FindAllCustomerOutputDto } from './findAll.customer.dto';

export class FindAllCustomerUseCase {
	private customerRepository: CustomerRepositoryInterface<Customer>;

	constructor(customerRepository: CustomerRepositoryInterface<Customer>) {
		this.customerRepository = customerRepository;
	}

	async execute(): Promise<FindAllCustomerOutputDto> {
		const customers = await this.customerRepository.findAll();
		return {
			customers: customers.map((customer) => ({
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
			})),
		};
	}
}
