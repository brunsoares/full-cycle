import { OtherProduct } from '../entities/other-product';
import { Product } from '../entities/product';
import { ProductInterface } from '../entities/product.interface';

export class ProductFactory {
	static createProduct(
		type: string,
		id: string,
		name: string,
		price: number,
	): ProductInterface {
		switch (type) {
			case 'Product':
				return new Product(id, name, price);
			case 'OtherProduct':
				return new OtherProduct(id, name, price);
			default:
				throw new Error('Tipo de produto inválido');
		}
	}
}
