import EventInterface from '../shared/event.interface';

export class ProductCreatedEvent implements EventInterface {
	dataTimestamp: Date;
	eventData: any;

	constructor(eventData: any) {
		this.dataTimestamp = new Date();
		this.eventData = eventData;
	}
}
