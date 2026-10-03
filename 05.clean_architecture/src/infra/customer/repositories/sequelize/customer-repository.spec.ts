import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from './customer.model';
import Address from '../../../../domain/customer/entities/address';
import { Customer } from '../../../../domain/customer/entities/customer';
import { CustomerRepository } from './customer-repository';

describe('Customer Repository unit tests', () => {
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

	/**
	 * Criar um novo cliente no repositório e verificar se ele foi criado corretamente
	 */
	it('should create a new customer and verify it was created correctly', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('1', 'Customer 1');
		const address = new Address('Street 1', 'City 1', 'State 1', '12345-678');
		customer.changeAddress(address);

		await customerRepository.save(customer);

		const customerModel = await CustomerModel.findOne({
			where: { id: '1' },
		});

		expect(customerModel.toJSON()).toStrictEqual({
			id: '1',
			name: 'Customer 1',
			street: 'Street 1',
			city: 'City 1',
			state: 'State 1',
			zipCode: '12345-678',
			active: false,
			rewardPoints: 0,
		});
	});

	/**
	 * Atualizar um cliente existente no repositório e verificar se ele foi atualizado corretamente
	 */
	it('should update an existing customer and verify it was updated correctly', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('1', 'Customer 1');
		const address = new Address('Street 1', 'City 1', 'State 1', '12345-678');
		customer.changeAddress(address);
		await customerRepository.save(customer);

		customer.changeName('Customer 2');
		const newAddress = new Address(
			'Street 2',
			'City 2',
			'State 2',
			'98765-432',
		);
		customer.changeAddress(newAddress);
		await customerRepository.update(customer);

		const customerModel = await CustomerModel.findOne({
			where: { id: '1' },
		});
		const customerFound = await customerRepository.find('1');

		expect(customerModel.toJSON()).toStrictEqual({
			id: customerFound.id,
			name: customerFound.name,
			street: customerFound.address.street,
			city: customerFound.address.city,
			state: customerFound.address.state,
			zipCode: customerFound.address.zipCode,
			active: customerFound.active,
			rewardPoints: customerFound.rewardPoints,
		});
	});

	/**
	 * Busca todos os clientes no repositório e verifica se eles foram encontrados corretamente
	 */
	it('should find all customers and verify they were found correctly', async () => {
		const customerRepository = new CustomerRepository();
		const customer1 = new Customer('1', 'Customer 1');
		const address1 = new Address('Street 1', 'City 1', 'State 1', '12345-678');
		customer1.changeAddress(address1);
		const customer2 = new Customer('2', 'Customer 2');
		const address2 = new Address('Street 2', 'City 2', 'State 2', '98765-432');
		customer2.changeAddress(address2);
		await customerRepository.save(customer1);
		await customerRepository.save(customer2);

		const customers = await customerRepository.findAll();
		const customerFound1 = await customerRepository.find('1');
		const customerFound2 = await customerRepository.find('2');

		expect(customers).toHaveLength(2);
		expect(customers[0]).toStrictEqual(customerFound1);
		expect(customers[1]).toStrictEqual(customerFound2);
	});

	/**
	 * Busca um cliente que não existe no repositório e verifica se ele lança um erro
	 */
	it('should throw an error when trying to find a non-existent customer', async () => {
		const customerRepository = new CustomerRepository();

		await expect(customerRepository.find('999')).rejects.toThrow(
			'Customer not found',
		);
	});

	/**
	 * Deleta um cliente existente no repositório e verifica se ele foi deletado corretamente
	 */
	it('should delete an existing customer and verify it was deleted correctly', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('1', 'Customer 1');
		const address = new Address('Street 1', 'City 1', 'State 1', '12345-678');
		customer.changeAddress(address);
		await customerRepository.save(customer);
		await customerRepository.delete('1');
		const customerModel = await CustomerModel.findOne({ where: { id: '1' } });
		expect(customerModel).toBeNull();
	});
});
