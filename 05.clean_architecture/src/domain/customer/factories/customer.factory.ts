import { Customer } from '../entities/customer';
import { CustomerInterface } from '../entities/customer.interface';
import { CustomerAnemico } from '../entities/customer_anemico';

export class CustomerFactory {
	static createCustomer(
		type: string,
		name: string,
		address: string,
	): CustomerInterface {
		switch (type) {
			case 'Customer':
				return new Customer(name, address);
			case 'Anemico':
				return new CustomerAnemico(name, address);
			default:
				throw new Error('Tipo de cliente inválido');
		}
	}
}
