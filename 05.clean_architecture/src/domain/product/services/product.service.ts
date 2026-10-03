import { Product } from '../entities/product';

export class ProductService {
	/**
	 * Aumenta o preço de todos os produtos em uma determinada porcentagem
	 * Não guarda o estado dos produtos, apenas altera o preço
	 * @param products - Array de produtos
	 * @param percentage - Porcentagem de aumento do preço
	 */
	static increasePrice(products: Array<Product>, percentage: number) {
		products.forEach((product) => {
			product.changePrice(product.price + (product.price * percentage) / 100);
		});
	}
}
