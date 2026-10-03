import EventHandlerInterface from '../../../shared/events/event-handler.interface';

export class EnviaConsoleLog2Handler implements EventHandlerInterface {
	handle(event: any): void {
		console.log('Esse é o segundo console.log do evento: CustomerCreated');
	}
}
