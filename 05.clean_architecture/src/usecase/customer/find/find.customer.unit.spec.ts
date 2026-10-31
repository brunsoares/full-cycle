import { describe, expect, it, jest } from '@jest/globals';
import Address from '../../../domain/customer/entities/address';
import { Customer } from '../../../domain/customer/entities/customer';
import { CustomerRepositoryInterface } from '../../../domain/customer/repositories/customer-repository.interface';
import { FindCustomerUseCase } from './find.customer.usecase';

// Cria dados do cliente
const customer = new Customer('1', 'Customer 1');
const address = new Address('Street 1', 'City 1', 'State 1', '12345-678');
customer.changeAddress(address);

/**
 * Estrutura de teste unitário para Use cases de Customer
 * Sem dependencia do repositorio, apenas testando a lógica do use case
 */
describe('Use case tests for Customer', () => {
	const mockRepository = (): jest.Mocked<
		CustomerRepositoryInterface<Customer>
	> => {
		return {
			find: jest
				.fn<(id: string) => Promise<Customer>>()
				.mockResolvedValue(customer),
			findAll: jest.fn(),
			save: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};
	};

	it('should find a customer by id', async () => {
		const customerRepository = mockRepository();
		const useCase = new FindCustomerUseCase(customerRepository);

		// Criando interações de use case
		const input = { id: '1' };
		const output = {
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
		};

		// Validando retorno do useCase
		const result = await useCase.execute(input);
		expect(result).toEqual(output);
	});

	it('should throw an error when customer is not found', async () => {
		const customerRepository = mockRepository();
		// Simula o comportamento para lançar um erro no find
		customerRepository.find.mockRejectedValue(new Error('Customer not found'));
		const useCase = new FindCustomerUseCase(customerRepository);

		const input = { id: '1' };

		await expect(useCase.execute(input)).rejects.toThrow('Customer not found');
	});
});
