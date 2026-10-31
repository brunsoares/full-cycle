import { describe, expect, it, jest } from '@jest/globals';
import { Customer } from '../../../domain/customer/entities/customer';
import { CustomerRepositoryInterface } from '../../../domain/customer/repositories/customer-repository.interface';
import { CreateCustomerUseCase } from './create.customer.usecase';

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
			findAll: jest.fn(),
			save: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};
	};

	it('should create a customer', async () => {
		const customerRepository = mockRepository();
		const useCase = new CreateCustomerUseCase(customerRepository);

		// Criando interações de use case
		const input = {
			name: 'Customer 1',
			address: {
				street: 'Street 1',
				city: 'City 1',
				state: 'State 1',
				zip: '12345-678',
			},
		};
		const output = {
			id: expect.any(String),
			name: 'Customer 1',
			address: {
				street: 'Street 1',
				city: 'City 1',
				state: 'State 1',
				zip: '12345-678',
			},
			active: false,
			rewardPoints: 0,
		};

		// Validando retorno do useCase
		const result = await useCase.execute(input);
		expect(result).toEqual(output);
	});

	it('should throw an error when name is missing', async () => {
		const customerRepository = mockRepository();
		const useCase = new CreateCustomerUseCase(customerRepository);

		const input = {
			name: '',
			address: {
				street: 'Street 1',
				city: 'City 1',
				state: 'State 1',
				zip: '12345-678',
			},
		};

		await expect(useCase.execute(input)).rejects.toThrow('Nome é obrigatório');
	});
});
