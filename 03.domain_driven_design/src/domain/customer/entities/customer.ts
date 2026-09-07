import { AggregateRoot } from '../../shared/events/aggregate-root';
import { CustomerAddressChangedEvent } from '../events/customer-address-changed.event';
import { CustomerCreatedEvent } from '../events/customer-created.event';
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
export class Customer extends AggregateRoot {
	private _id: string;
	private _name: string;
	private _address: Address = {} as Address;
	private _active: boolean = false;
	private _rewardPoints: number = 0;

	/**
	 * Construtor da entidade Customer
	 * @param id - ID do cliente
	 * @param name - Nome do cliente
	 */
	constructor(id: string, name: string) {
		super();
		this._id = id;
		this._name = name;
		// Valida a entidade ao ser criada
		if (this.validate()) {
			this.addEvent(new CustomerCreatedEvent(this)); // Adiciona o evento de criação do cliente
		}
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
		console.log(`Endereço do cliente ${this._name} alterado`);
		this._address = newAddress;
		// Valida a entidade após alterar o endereço
		if (this.validate()) {
			this.addEvent(new CustomerAddressChangedEvent(this)); // Adiciona o evento de mudança de endereço
		}
	}

	changeName(newName: string): void {
		// Poderia executar alguma regra de negócio aqui antes de alterar o nome
		console.log(`Nome do cliente ${this._name} alterado para ${newName}`);
		this._name = newName;
		this.validate(); // Valida a entidade após alterar o nome
	}

	activate(): void {
		// Poderia executar alguma regra de negócio aqui antes de ativar o cliente
		if (this.validate() && this.validateAddress()) {
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
		if (!this._name) {
			throw new Error('Nome é obrigatório');
		}
		if (!this._id) {
			throw new Error('ID é obrigatório');
		}
		return true;
	}

	validateAddress(): boolean {
		// Poderia executar alguma regra de negócio aqui para validar o endereço
		if (Object.keys(this._address).length === 0) {
			throw new Error('Endereço é obrigatório para ativar o cliente');
		}
		return true;
	}

	addRewardPoints(points: number): void {
		// Poderia executar alguma regra de negócio aqui para adicionar pontos de recompensa
		console.log(
			`Adicionando ${points} pontos de recompensa para o cliente ${this._name}`,
		);
		this._rewardPoints += points;
	}

	checkRewardPoints(): number {
		// Poderia executar alguma regra de negócio aqui para verificar os pontos de recompensa
		console.log(
			`Cliente ${this._name} possui ${this._rewardPoints} pontos de recompensa`,
		);
		return this._rewardPoints;
	}

	get name(): string {
		return this._name;
	}

	get id(): string {
		return this._id;
	}

	get address(): Address {
		return this._address;
	}

	get active(): boolean {
		return this._active;
	}

	get rewardPoints(): number {
		return this._rewardPoints;
	}
}
