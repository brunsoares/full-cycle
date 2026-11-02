import { FindAllCustomerOutputDto } from '../../../usecase/customer/findAll/findAll.customer.dto';
import { toXML } from 'jstoxml';

export class CustomerPresenter {
	static toXML(data: FindAllCustomerOutputDto): string {
		const xmlOpts = {
			header: true,
			indent: '  ',
			newline: '\n',
			allowEmpty: true,
		};

		return toXML(
			{
				customers: {
					customer: data.customers.map((customer) => ({
						id: customer.id,
						name: customer.name,
						address: {
							street: customer.address.street,
							city: customer.address.city,
							state: customer.address.state,
							zip: customer.address.zip,
						},
						active: customer.active,
						rewardPoints: customer.rewardPoints,
					})),
				},
			},
			xmlOpts,
		);
	}
}
