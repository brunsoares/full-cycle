/**
 * DTO é o objeto de transferência de dados
 * Quem vai chamar não precisa saber como a entidade é estruturada
 */
export interface FindCustomerInputDto {
	id: string;
}

export interface FindCustomerOutputDto {
	id: string;
	name: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
	active: boolean;
	rewardPoints: number;
}
