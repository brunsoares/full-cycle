import { describe, expect, it } from '@jest/globals';
import { Customer } from './customer';
import Address from './address';

/**
 * Estrutura de teste unitário para a entidade Customer
 */
describe('Customer unit tests', () => {
	/**
	 * Checa se o ID do cliente é obrigatório
	 */
	it('should throw error when id is empty', () => {
		expect(() => {
			const customer = new Customer('', 'John Doe');
		}).toThrow('ID é obrigatório');
	});

	/**
	 * Checa se o nome do cliente é obrigatório
	 */
	it('should throw error when name is empty', () => {
		expect(() => {
			const customer = new Customer('123', '');
		}).toThrow('Nome é obrigatório');
	});

	/**
	 * Mudar o nome do cliente
	 */
	it('should change name', () => {
		const customer = new Customer('123', 'John Doe');
		customer.changeName('Jane Doe');
		expect(customer.name).toBe('Jane Doe');
	});

	/**
	 * Checa endereço ao ativar o cliente e permite ativar o cliente apenas se o endereço estiver definido
	 */
	it('should activate customer only if address is defined', () => {
		const customer = new Customer('123', 'John Doe');
		const address = new Address('123 Main St', 'Anytown', 'CA', '12345');
		customer.changeAddress(address);
		customer.activate();
		expect(customer.checkStatus()).toBe(true);
	});

	/**
	 * Checa se o cliente pode ser ativado sem endereço definido
	 */
	it('should not activate customer without address', () => {
		const customer = new Customer('123', 'John Doe');
		expect(() => {
			customer.activate();
		}).toThrow('Endereço é obrigatório para ativar o cliente');
	});

	/**
	 * Checa se o cliente pode ser desativado
	 */
	it('should deactivate customer', () => {
		const customer = new Customer('123', 'John Doe');
		customer.deactivate();
		expect(customer.checkStatus()).toBe(false);
	});
});
