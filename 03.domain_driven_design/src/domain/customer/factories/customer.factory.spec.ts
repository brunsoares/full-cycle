import { describe, expect, it } from '@jest/globals';
import { Customer } from '../entities/customer';
import { CustomerFactory } from './customer.factory';
import { CustomerAnemico } from '../entities/customer_anemico';

describe('Customer Factory unit tests', () => {
	it('should create a customer type Customer', () => {
		const customer = CustomerFactory.createCustomer(
			'Customer',
			'1',
			'John Doe',
		);
		expect(customer).toBeInstanceOf(Customer);
		expect(customer.id).toBeDefined();
		expect(customer.name).toBe('John Doe');
	});

	it('should create a customer type CustomerAnemico', () => {
		const customer = CustomerFactory.createCustomer('Anemico', '1', 'John Doe');
		expect(customer).toBeInstanceOf(CustomerAnemico);
		expect(customer.id).toBeDefined();
		expect(customer.name).toBe('John Doe');
	});

	it('should throw an error when trying to create a customer with an invalid type', () => {
		expect(() => {
			CustomerFactory.createCustomer('InvalidType', '1', 'John Doe');
		}).toThrow('Tipo de cliente inválido');
	});
});
