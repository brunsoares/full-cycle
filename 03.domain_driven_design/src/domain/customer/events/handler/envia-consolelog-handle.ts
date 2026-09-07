import EventHandlerInterface from '../../../shared/events/event-handler.interface';

export class EnviaConsoleLogHandle implements EventHandlerInterface {
	handle(event: any): void {
		console.log(
			`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.checkAddress()}`,
		);
	}
}
