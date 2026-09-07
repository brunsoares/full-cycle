import EventInterface from './event.interface';

export abstract class AggregateRoot {
	events: Set<EventInterface> = new Set<EventInterface>();

	addEvent(event: EventInterface): void {
		this.events.add(event);
	}

	clearEvents(): void {
		this.events.clear();
	}
}
