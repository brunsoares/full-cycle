import { describe, expect, it } from '@jest/globals';
import { Product } from '../entities/product';
import { ProductFactory } from './product.factory';
import { OtherProduct } from '../entities/other-product';

describe('Product Factory unit tests', () => {
	it('should create a product type Product', () => {
		const product = ProductFactory.createProduct(
			'Product',
			'1',
			'Product 1',
			100,
		);
		expect(product).toBeInstanceOf(Product);
		expect(product.id).toBeDefined();
		expect(product.name).toBe('Product 1');
		expect(product.price).toBe(100);
	});

	it('should create a product type OtherProduct', () => {
		const product = ProductFactory.createProduct(
			'OtherProduct',
			'1',
			'Product 1',
			100,
		);
		expect(product).toBeInstanceOf(OtherProduct);
		expect(product.id).toBeDefined();
		expect(product.name).toBe('Product 1');
		expect(product.price).toBe(100);
	});

	it('should throw an error when trying to create a product with an invalid type', () => {
		expect(() => {
			ProductFactory.createProduct('InvalidType', '1', 'Product 1', 100);
		}).toThrow('Tipo de produto inválido');
	});
});
