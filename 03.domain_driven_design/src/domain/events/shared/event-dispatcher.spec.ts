import { describe, expect, it, jest } from '@jest/globals';
import { EventDispatcher } from './event-dispatcher';
import { SendEmailWhenProductIsCreatedHandler } from '../product/handler/send-email-when-product-is-created.handle';
import { ProductCreatedEvent } from '../product/product-created.event';

describe('Event Dispatcher unit tests', () => {
	/**
	 * Registrar um handler de evento e verificar se ele foi registrado corretamente
	 */
	it('should register an event handler', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		eventDispatcher.register('ProductCreatedEvent', eventHandler);
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent'],
		).toBeDefined();
		expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
			1,
		);
		expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(
			eventHandler,
		);
	});

	it('should unregister an event handler', () => {
		// Registrar um handler de evento e verificar se ele foi registrado corretamente
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		eventDispatcher.register('ProductCreatedEvent', eventHandler);
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent'],
		).toBeDefined();
		expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
			1,
		);
		expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(
			eventHandler,
		);

		// Desregistrar o handler de evento e verificar se ele foi desregistrado corretamente
		eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent'],
		).toBeDefined();
		expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
			0,
		);
	});

	it('should unregister all event handlers', () => {
		// Registrar dois handlers de evento e verificar se eles foram registrados corretamente
		const eventDispatcher = new EventDispatcher();
		const eventHandler1 = new SendEmailWhenProductIsCreatedHandler();
		const eventHandler2 = new SendEmailWhenProductIsCreatedHandler();
		eventDispatcher.register('ProductCreatedEvent', eventHandler1);
		eventDispatcher.register('ProductCreatedEvent', eventHandler2);
		expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
			2,
		);

		// Desregistrar todos os handlers de evento e verificar se eles foram desregistrados corretamente
		eventDispatcher.unregisterAll();
		expect(
			eventDispatcher.getEventHandlers['ProductCreatedEvent'],
		).toBeUndefined();
	});

	it('should notify all event handlers', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		const spyEventHandler = jest.spyOn(eventHandler, 'handle');
		eventDispatcher.register('ProductCreatedEvent', eventHandler);

		expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(
			eventHandler,
		);

		const productCreatedEvent = new ProductCreatedEvent({
			name: 'Product 1',
			description: 'Product 1 description',
			price: 10.0,
		});

		// Ao notificar o evento, o handler deve ser chamado e o console.log deve ser executado
		eventDispatcher.notify(productCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
	});
});
