import { describe, expect, it } from '@jest/globals';
import { Product } from './product';

describe('Product unit tests', () => {
	/**
	 * Checa se o ID do produto é obrigatório
	 */
	it('should throw error when id is empty', () => {
		expect(() => {
			const product = new Product('', 'Product 1', 10);
		}).toThrow('ID é obrigatório');
	});

	/**
	 * Checa se o nome do produto é obrigatório
	 */
	it('should throw error when name is empty', () => {
		expect(() => {
			const product = new Product('1', '', 10);
		}).toThrow('Nome é obrigatório');
	});

	/**
	 * Checa se o preço do produto é inválido
	 */
	it('should throw error when price is less than zero', () => {
		expect(() => {
			const product = new Product('1', 'Product 1', -10);
		}).toThrow('Preço inválido');
	});

	/**
	 * Checa se o nome do produto é alterado corretamente
	 */
	it('should change name', () => {
		const product = new Product('1', 'Product 1', 10);
		product.changeName('Product 2');
		expect(product).toMatchObject({
			_id: '1',
			_name: 'Product 2',
			_price: 10,
		});
	});

	/**
	 * Checa se o preço do produto é alterado corretamente
	 */
	it('should change price', () => {
		const product = new Product('1', 'Product 1', 10);
		product.changePrice(20);
		expect(product).toMatchObject({
			_id: '1',
			_name: 'Product 1',
			_price: 20,
		});
	});
});
