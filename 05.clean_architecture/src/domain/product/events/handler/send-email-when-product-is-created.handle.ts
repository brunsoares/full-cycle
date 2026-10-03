import EventHandlerInterface from '../../../shared/events/event-handler.interface';
import { ProductCreatedEvent } from '../product-created.event';

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
	handle(event: ProductCreatedEvent): void {
		console.log(
			`Sending email to customer about product '${event.eventData.name}' creation.`,
		);
	}
}
