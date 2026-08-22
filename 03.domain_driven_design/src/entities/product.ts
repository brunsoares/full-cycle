export class Product {
	private _id: string;
	private _name: string;
	private _price: number;

	constructor(id: string, name: string, price: number) {
		this._id = id;
		this._name = name;
		this._price = price;
		this.validate();
	}

	validate(): boolean {
		if (this._id.length === 0) {
			throw new Error('ID é obrigatório');
		}
		if (this._name.length === 0) {
			throw new Error('Nome é obrigatório');
		}
		if (this._price < 0) {
			throw new Error('Preço inválido');
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
}
