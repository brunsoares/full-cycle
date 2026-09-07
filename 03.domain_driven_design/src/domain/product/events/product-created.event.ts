import EventInterface from '../../shared/events/event.interface';

export class ProductCreatedEvent implements EventInterface {
	eventData: any;

	constructor(eventData: any) {
		this.eventData = eventData;
	}
}
