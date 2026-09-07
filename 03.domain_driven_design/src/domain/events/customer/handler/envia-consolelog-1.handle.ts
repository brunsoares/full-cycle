import EventHandlerInterface from '../../shared/event-handler.interface';

export class EnviaConsoleLog1Handler implements EventHandlerInterface {
	handle(event: any): void {
		console.log('Esse é o primeiro console.log do evento: CustomerCreated');
	}
}
