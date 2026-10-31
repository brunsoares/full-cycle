export interface UpdateCustomerInputDto {
	id: string;
	name: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
}

export interface UpdateCustomerOutputDto {
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
