export interface OrderProps {
	id: string;
	customerId: string;
	items: {
		id: string;
		name: string;
		price: number;
		productId: string;
		quantity: number;
	}[];
}
