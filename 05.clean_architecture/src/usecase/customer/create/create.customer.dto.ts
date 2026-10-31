export interface CreateCustomerInputDto {
	name: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
}

export interface CreateCustomerOutputDto {
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
