import { Customer } from '../entities/customer';
import EventInterface from '../../shared/events/event.interface';

export class CustomerCreatedEvent implements EventInterface {
	dataTimestamp: Date;
	eventData: Customer;

	constructor(eventData: Customer) {
		this.dataTimestamp = new Date();
		this.eventData = eventData;
	}
}
