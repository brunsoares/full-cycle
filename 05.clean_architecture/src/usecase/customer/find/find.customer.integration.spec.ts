import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import { CustomerModel } from '../../../infra/customer/repositories/sequelize/customer.model';
import { CustomerRepository } from '../../../infra/customer/repositories/sequelize/customer-repository';
import { Customer } from '../../../domain/customer/entities/customer';
import Address from '../../../domain/customer/entities/address';
import { FindCustomerUseCase } from './find.customer.usecase';

/**
 * Estrutura de teste unitário para Use cases de Customer - Find
 */
describe('Use case tests for Customer', () => {
	let sequelize: Sequelize;

	/**
	 * Executa antes de cada teste, criando uma nova instância do Sequelize e sincronizando o banco de dados em memória
	 */
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});

	/**
	 * Executa após cada teste, fechando a conexão com o banco de dados em memória
	 */
	afterEach(async () => {
		await sequelize.close();
	});

	it('should find a customer by id', async () => {
		const customerRepository = new CustomerRepository();
		const useCase = new FindCustomerUseCase(customerRepository);
		// Cria dados do cliente
		const customer = new Customer('1', 'Customer 1');
		const address = new Address('Street 1', 'City 1', 'State 1', '12345-678');
		customer.changeAddress(address);
		await customerRepository.save(customer);

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
});
