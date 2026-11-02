import { ValidatorInterface } from '../../shared/validator/validator.interface';
import { Product } from '../entities/product';
import { ProductYupValidator } from '../validator/product.yup.validator';

/**
 * Desacomplamento da criação do validador de produto, permitindo a substituição do validador sem alterar a lógica de negócio.
 */
export class ProductValidatorFactory {
	static create(): ValidatorInterface<Product> {
		return new ProductYupValidator();
	}
}
