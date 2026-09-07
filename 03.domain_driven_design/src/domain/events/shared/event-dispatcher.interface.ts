import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

/**
 * Interface para o dispatcher de eventos
 * O dispatcher é responsável por disparar os eventos e notificar os handles
 */
export default interface EventDispatcherInterface {
	notify(event: EventInterface): void;
	register(eventName: string, eventHandler: EventHandlerInterface): void;
	unregister(eventName: string, eventHandler: EventHandlerInterface): void;
	unregisterAll(): void;
}
