import { ProductRepositoryInterface } from '../../../../domain/product/repositories/product-repository.interface';
import { Product } from '../../../../domain/product/entities/product';
import { ProductModel } from './product.model';

export class ProductRepository implements ProductRepositoryInterface<Product> {
	async save(entity: Product): Promise<void> {
		await ProductModel.create({
			id: entity.id,
			name: entity.name,
			price: entity.price,
		});
	}
	async update(entity: Product): Promise<void> {
		await ProductModel.update(
			{
				name: entity.name,
				price: entity.price,
			},
			{
				where: {
					id: entity.id,
				},
			},
		);
	}
	async find(id: string): Promise<Product> {
		return await ProductModel.findOne({ where: { id } }).then(
			(productModel) => {
				if (!productModel) {
					throw new Error('Product not found');
				}
				return new Product(
					productModel.id,
					productModel.name,
					productModel.price,
				);
			},
		);
	}
	async findAll(): Promise<Product[]> {
		return await ProductModel.findAll().then((productModels) => {
			return productModels.map(
				(productModel) =>
					new Product(productModel.id, productModel.name, productModel.price),
			);
		});
	}
	async delete(id: string): Promise<void> {
		await ProductModel.destroy({ where: { id } });
	}
}
