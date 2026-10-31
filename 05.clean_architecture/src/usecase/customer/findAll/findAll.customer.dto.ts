export interface FindAllCustomerInputDto {}

type CustomerOutputDto = {
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
};

export interface FindAllCustomerOutputDto {
	customers: Array<CustomerOutputDto>;
}
