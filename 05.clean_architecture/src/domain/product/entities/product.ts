import { Entity } from '../../entity/entity.abstract';
import { NotificationError } from '../../notification/notification.error';
import { ProductInterface } from './product.interface';

export class Product extends Entity implements ProductInterface {
	private _name: string;
	private _price: number;

	constructor(id: string, name: string, price: number) {
		super();
		this._id = id;
		this._name = name;
		this._price = price;
		this.validate();
		if (this._notification.hasErrors()) {
			throw new NotificationError(this._notification.getErrorsList());
		}
	}

	validate(): boolean {
		if (this._id.length === 0) {
			this._notification.addError({
				message: 'ID é obrigatório',
				context: 'product',
			});
		}
		if (this._name.length === 0) {
			this._notification.addError({
				message: 'Nome é obrigatório',
				context: 'product',
			});
		}
		if (this._price < 0) {
			this._notification.addError({
				message: 'Preço inválido',
				context: 'product',
			});
		}
		return true;
	}

	changeName(name: string): void {
		this._name = name;
		console.log(`Nome do produto alterado para: ${this._name}`);
		this.validate();
	}

	changePrice(price: number): void {
		this._price = price;
		console.log(`Preço do produto alterado para: ${this._price}`);
		this.validate();
	}

	get price(): number {
		return this._price;
	}

	get name(): string {
		return this._name;
	}

	get id(): string {
		return this._id;
	}
}
