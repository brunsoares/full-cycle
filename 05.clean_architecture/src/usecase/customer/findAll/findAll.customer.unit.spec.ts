import { describe, expect, it, jest } from '@jest/globals';
import { Customer } from '../../../domain/customer/entities/customer';
import { CustomerRepositoryInterface } from '../../../domain/customer/repositories/customer-repository.interface';
import Address from '../../../domain/customer/entities/address';
import { FindAllCustomerUseCase } from './findAll.customer.usecase';

// Cria dados dos clientes
const customer = new Customer('1', 'Customer 1');
const address = new Address('Street 1', 'City 1', 'State 1', '12345-678');
customer.changeAddress(address);

const customer2 = new Customer('2', 'Customer 2');
const address2 = new Address('Street 2', 'City 2', 'State 2', '87654-321');
customer2.changeAddress(address2);

const customer3 = new Customer('3', 'Customer 3');
const address3 = new Address('Street 3', 'City 3', 'State 3', '54321-987');
customer3.changeAddress(address3);

/**
 * Estrutura de teste unitário para Use cases de Customer
 * Sem dependencia do repositorio, apenas testando a lógica do use case
 */
describe('Use case tests for Customer', () => {
	const mockRepository = (): jest.Mocked<
		CustomerRepositoryInterface<Customer>
	> => {
		return {
			find: jest.fn(),
			findAll: jest
				.fn<() => Promise<Array<Customer>>>()
				.mockResolvedValue([customer, customer2, customer3]),
			save: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};
	};

	it('should find all registered customers', async () => {
		const customerRepository = mockRepository();
		const useCase = new FindAllCustomerUseCase(customerRepository);

		// Criando interações de use case
		const output = {
			customers: [
				{
					id: '1',
					name: 'Customer 1',
					address: {
						street: 'Street 1',
						city: 'City 1',
						state: 'State 1',
						zip: '12345-678',
					},
					active: false,
					rewardPoints: 0,
				},
				{
					id: '2',
					name: 'Customer 2',
					address: {
						street: 'Street 2',
						city: 'City 2',
						state: 'State 2',
						zip: '87654-321',
					},
					active: false,
					rewardPoints: 0,
				},
				{
					id: '3',
					name: 'Customer 3',
					address: {
						street: 'Street 3',
						city: 'City 3',
						state: 'State 3',
						zip: '54321-987',
					},
					active: false,
					rewardPoints: 0,
				},
			],
		};

		// Validando retorno do useCase
		const result = await useCase.execute();
		expect(result).toEqual(output);
	});
});
