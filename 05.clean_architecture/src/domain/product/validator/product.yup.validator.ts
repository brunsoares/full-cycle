import { ValidatorInterface } from '../../shared/validator/validator.interface';
import { Product } from '../entities/product';
import * as yup from 'yup';

export class ProductYupValidator implements ValidatorInterface<Product> {
	validate(entity: Product): void {
		try {
			// Define as validações usando o Yup
			const schema = yup.object().shape({
				id: yup.string().required('ID é obrigatório'),
				name: yup.string().required('Nome é obrigatório'),
				price: yup.number().min(0, 'Preço inválido'),
			});
			// Valida o produto usando o schema definido
			schema.validateSync(
				{
					id: entity.id,
					name: entity.name,
					price: entity.price,
				},
				{
					abortEarly: false, // Para capturar todos os erros de validação
				},
			);
		} catch (error) {
			// Se ocorrer um erro de validação, adiciona os erros à notificação do produto
			const errors = error as yup.ValidationError;
			errors.inner.forEach((err) => {
				if (err.path) {
					entity._notification.addError({
						message: err.message,
						context: 'product',
					});
				}
			});
		}
	}
}
