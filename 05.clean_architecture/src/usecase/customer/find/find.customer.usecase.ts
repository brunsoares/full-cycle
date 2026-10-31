import { Customer } from '../../../domain/customer/entities/customer';
import { CustomerRepositoryInterface } from '../../../domain/customer/repositories/customer-repository.interface';
import {
	FindCustomerInputDto,
	FindCustomerOutputDto,
} from './find.customer.dto';

export class FindCustomerUseCase {
	private customerRepository: CustomerRepositoryInterface<Customer>;

	constructor(customerRepository: CustomerRepositoryInterface<Customer>) {
		this.customerRepository = customerRepository;
	}

	async execute(input: FindCustomerInputDto): Promise<FindCustomerOutputDto> {
		const customer = await this.customerRepository.find(input.id);
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
