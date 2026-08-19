/**
 * Exemplo de classe identificada como Value Object, que não possui identidade própria, e sim é definido por seus atributos.
 * Essas classes podem ser imutáveis, ou seja, uma vez criadas, não podem ser alteradas apenas substituídas por uma nova instância.
 * EX: Tenho um endereço, se eu quiser alterar o endereço, eu não altero o endereço existente, eu crio um novo endereço e substituo o antigo.
 */
export default class Address {
	private _street: string;
	private _city: string;
	private _state: string;
	private _zipCode: string;

	/**
	 * Construtor dessa forma, força a criação de um endereço consistente, pois não é possível criar um endereço sem rua, cidade, estado e CEP.
	 * Essa classe não é possivel alterar um atributo individualmente, apenas criar um novo endereço com os atributos desejados.
	 */
	constructor(street: string, city: string, state: string, zipCode: string) {
		this._street = street;
		this._city = city;
		this._state = state;
		this._zipCode = zipCode;
		this.validate(); // Valida o Value Object ao ser criado
	}

	checkAddress(): string {
		return `${this._street}, ${this._city}, ${this._state}, ${this._zipCode}`;
	}

	/** Valida o Value Object, garantindo que ele está em um estado consistente */
	validate(): boolean {
		if (!this._street) {
			console.log('Endereço inválido: rua não pode ser vazia');
			return false;
		}
		if (!this._city) {
			console.log('Endereço inválido: cidade não pode ser vazia');
			return false;
		}
		if (!this._state) {
			console.log('Endereço inválido: estado não pode ser vazio');
			return false;
		}
		if (!this._zipCode) {
			console.log('Endereço inválido: CEP não pode ser vazio');
			return false;
		}
		return true;
	}
}
