import { CustomerInterface } from './customer.interface';

/**
 * Exemplo de classe voltada para o modelo anêmico, que não possui comportamentos, apenas atributos.
 * Voltado para persistência de dados, sem regras de negócio.
 */
export class CustomerAnemico implements CustomerInterface {
	private _id: string;
	private _name: string;
	private _address: string;
	private _active: boolean = false;

	constructor(id: string, name: string) {
		this._id = id;
		this._name = name;
	}

	/** Exemplos de métodos genéricos apenas para mudança de estado do atributo, sem regra de negocio */
	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get address(): string {
		return this._address;
	}

	get active(): boolean {
		return this._active;
	}

	set id(value: string) {
		this._id = value;
	}

	set name(value: string) {
		this._name = value;
	}

	set address(value: string) {
		this._address = value;
	}

	set active(value: boolean) {
		this._active = value;
	}
}
