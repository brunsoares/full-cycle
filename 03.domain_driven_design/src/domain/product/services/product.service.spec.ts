import { describe, expect, it } from '@jest/globals';
import { Product } from '../entities/product';
import { ProductService } from './product.service';

describe('Product Service unit tests', () => {
	/**
	 * Checa se o ID do pedido é obrigatório
	 */
	it('should changes the prices for all the products', () => {
		const product1 = new Product('1', 'Product 1', 10);
		const product2 = new Product('2', 'Product 2', 20);
		const product3 = new Product('3', 'Product 3', 30);
		const products = [product1, product2, product3];

		// Aumenta o preço de todos os produtos em 100%
		ProductService.increasePrice(products, 100);

		expect(product1.price).toBe(20);
		expect(product2.price).toBe(40);
		expect(product3.price).toBe(60);
	});
});
