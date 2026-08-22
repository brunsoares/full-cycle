import { OrderItems } from './order-items';

/**
 * Representa a ordem do pedido
 * É o root aggregate, pois é a entidade que agrega as demais
 */
export class Order {
	private _id: string;
	private _customerId: string;
	private _items: OrderItems[] = [];
	private _total: number = 0;

	constructor(id: string, customerId: string) {
		this._id = id;
		this._customerId = customerId;
		this.validate();
	}

	addItem(item: OrderItems): void {
		this._items.push(item);
		if (item['_price'] < 0) {
			throw new Error('Não é permitido adicionar itens com preço negativo');
		}
		console.log(`Item ${item['_name']} adicionado à ordem ${this._id}`);
	}

	total(): number {
		this._total = this._items.reduce(
			(acc, item) => acc + item['_price'] * item['_quantity'],
			0,
		);
		console.log(`Total da ordem ${this._id}: ${this._total}`);
		return this._total;
	}

	validate(): boolean {
		if (!this._id) {
			throw new Error('ID é obrigatório');
		}
		if (!this._customerId) {
			throw new Error('ID do cliente é obrigatório');
		}
		return true;
	}

	get id(): string {
		return this._id;
	}

	get customerId(): string {
		return this._customerId;
	}

	get items(): OrderItems[] {
		return this._items;
	}
}
