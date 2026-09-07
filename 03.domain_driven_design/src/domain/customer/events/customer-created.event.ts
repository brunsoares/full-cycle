import { Customer } from '../entities/customer';
import EventInterface from '../../shared/events/event.interface';

export class CustomerCreatedEvent implements EventInterface {
	eventData: Customer;

	constructor(eventData: Customer) {
		this.eventData = eventData;
	}
}
