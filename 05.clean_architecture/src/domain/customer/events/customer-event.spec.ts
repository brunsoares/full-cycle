import { describe, expect, it, jest } from '@jest/globals';
import { EnviaConsoleLog1Handler } from './handler/envia-consolelog-1.handle';
import { EnviaConsoleLogHandle } from './handler/envia-consolelog-handle';
import { EnviaConsoleLog2Handler } from './handler/envia-consolog-2.handle';
import { EventDispatcher } from '../../shared/events/event-dispatcher';
import Address from '../entities/address';
import { Customer } from '../entities/customer';

describe('Client Events Dispatcher unit tests', () => {
	it('should notify when a customer is created and execute the registered handlers', () => {
		// Configurando evento e handlers
		const eventDispatcher = new EventDispatcher();
		const eventHandler1 = new EnviaConsoleLog1Handler();
		const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
		const eventHandler2 = new EnviaConsoleLog2Handler();
		const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');
		eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
		eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

		// Checa se os handlers foram registrados corretamente
		expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toBe(
			eventHandler1,
		);
		expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toBe(
			eventHandler2,
		);
		expect(
			eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length,
		).toBe(2);

		// No momento da criação do cliente, o evento de criação é armazenado
		const customer = new Customer('1', 'John Doe');

		// Executando eventos do cliente
		customer.events.forEach((event) => {
			eventDispatcher.notify(event);
		});

		// Checando se os handlers foram chamados
		expect(spyEventHandler1).toHaveBeenCalled();
		expect(spyEventHandler2).toHaveBeenCalled();
	});

	it('should notify when a customer has a address changed and execute the registered handlers', () => {
		// Configurando evento e handlers
		const eventDispatcher = new EventDispatcher();
		const eventHandlerAddress = new EnviaConsoleLogHandle();
		const spyEventHandlerAddress = jest.spyOn(eventHandlerAddress, 'handle');
		eventDispatcher.register(
			'CustomerAddressChangedEvent',
			eventHandlerAddress,
		);

		// Checa se os handlers foram registrados corretamente
		expect(
			eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0],
		).toBe(eventHandlerAddress);
		expect(
			eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length,
		).toBe(1);

		// Criando cliente e vinculando um endereço
		const customer = new Customer('1', 'John Doe');
		const newAddress = new Address('123 Main St', 'City', 'State', '12345');
		// No momento da mudança de endereço, o evento de mudança de endereço é armazenado
		customer.changeAddress(newAddress);

		customer.events.forEach((event) => {
			eventDispatcher.notify(event);
		});

		// Checando se os handlers foram chamados
		expect(spyEventHandlerAddress).toHaveBeenCalled();
	});
});
