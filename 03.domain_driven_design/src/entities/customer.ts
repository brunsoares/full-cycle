import Address from './address';

/**
 * Exemplo de classe não anêmica, que possui comportamentos, e não apenas atributos.
 * Entidade deve ter -> segundo DDD
 * 		um ID único
 * 		atributos que podem ser alterados com o tempo
 * 		deve ter comportamentos que alteram o estado da entidade
 * 		deve conter as regras de negócio da entidade
 * 		sempre deve ser autovalidada, ou seja, não deve ser possível criar uma entidade inconsistente
 *
 */
class Customer {
	private _id: string;
	private _name: string;
	private _address: Address;
	private _active: boolean = false;

	/**
	 * Construtor da entidade Customer
	 * @param id - ID do cliente
	 * @param name - Nome do cliente
	 * @param address - Endereço do cliente
	 */
	constructor(id: string, name: string, address: Address) {
		this._id = id;
		this._name = name;
		this._address = address;
		this.validate(); // Valida a entidade ao ser criada
	}

	/** Exemplo de construtor que não possui regras de negócio, apenas inicializa os atributos
	 * Usando esse construtor, a entidade não tem consistência, pois podemos criar um cliente sem nome e endereço, o que não faz sentido no contexto do negócio.
	 */
	/**
	constructor(id: string) {
		this._id = id;
		this._name = '';
		this._address = '';
	}
	*/

	/** Exemplos de métodos voltados para regras de negócio */
	changeAddress(newAddress: Address): void {
		// Poderia executar alguma regra de negócio aqui antes de alterar o endereço
		console.log(
			`Endereço do cliente ${this._name} alterado de ${this._address.checkAddress()} para ${newAddress.checkAddress()}`,
		);
		this._address = newAddress;
		this.validate(); // Valida a entidade após alterar o endereço
	}

	changeName(newName: string): void {
		// Poderia executar alguma regra de negócio aqui antes de alterar o nome
		console.log(`Nome do cliente ${this._name} alterado para ${newName}`);
		this._name = newName;
		this.validate(); // Valida a entidade após alterar o nome
	}

	activate(): void {
		// Poderia executar alguma regra de negócio aqui antes de ativar o cliente
		if (this.validate()) {
			console.log(`Cliente ${this._name} ativado`);
			this._active = true;
		}
	}

	deactivate(): void {
		// Poderia executar alguma regra de negócio aqui antes de desativar o cliente
		console.log(`Cliente ${this._name} desativado`);
		this._active = false;
	}

	checkStatus(): boolean {
		// Poderia executar alguma regra de negócio aqui para verificar o status do cliente
		console.log(
			`Cliente ${this._name} está ${this._active ? 'ativo' : 'inativo'}`,
		);
		return this._active;
	}

	validate(): boolean {
		// Poderia executar alguma regra de negócio aqui para validar a entidade
		if (!this._name || !this._address) {
			throw new Error('Nome e endereço são obrigatórios');
		}
		if (!this._id) {
			throw new Error('ID é obrigatório');
		}
		return true;
	}
}
