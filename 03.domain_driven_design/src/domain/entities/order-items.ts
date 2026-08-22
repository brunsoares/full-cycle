/**
 * Interface vinculada a ordem do pedido
 * Está agregada ao Order, pois não faz sentido existir sem o mesmo
 */
export class OrderItems {
	private _id: string;
	private _name: string;
	private _price: number;
	private _productId: string;
	private _quantity: number;

	constructor(
		id: string,
		name: string,
		price: number,
		productId: string,
		quantity: number,
	) {
		this._id = id;
		this._name = name;
		this._price = price;
		this._productId = productId;
		this._quantity = quantity;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get price(): number {
		return this._price;
	}

	get productId(): string {
		return this._productId;
	}

	get quantity(): number {
		return this._quantity;
	}
}
