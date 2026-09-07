import EventInterface from './event.interface';

/**
 * Interface para handles de eventos
 * Handle é responsável por executar a ação de um evento
 */
export default interface EventHandlerInterface<
	T extends EventInterface = EventInterface,
> {
	handle(event: T): void;
}
