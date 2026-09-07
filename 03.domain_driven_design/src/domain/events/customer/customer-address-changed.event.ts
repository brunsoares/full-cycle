import { Customer } from '../../entities/customer';
import EventInterface from '../shared/event.interface';

export class CustomerAddressChangedEvent implements EventInterface {
	dataTimestamp: Date;
	eventData: Customer;

	constructor(eventData: Customer) {
		this.dataTimestamp = new Date();
		this.eventData = eventData;
	}
}
