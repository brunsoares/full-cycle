import { describe, expect, it, jest } from '@jest/globals';
import { EventDispatcher } from '../../shared/events/event-dispatcher';
import { EnviaConsoleLog1Handler } from './handler/envia-consolelog-1.handle';
import { EnviaConsoleLog2Handler } from './handler/envia-consolog-2.handle';
import { CustomerCreatedEvent } from './customer-created.event';
import { Customer } from '../entities/customer';
import Address from '../entities/address';
import { EnviaConsoleLogHandle } from './handler/envia-consolelog-handle';
import { CustomerAddressChangedEvent } from './customer-address-changed.event';

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

		// Criando cliente e evento de criação de cliente
		const customer = new Customer('1', 'John Doe');
		const customerCreatedEvent = new CustomerCreatedEvent(customer);

		// Ao notificar o evento, o handler deve ser chamado e o console.log deve ser executado
		eventDispatcher.notify(customerCreatedEvent);

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
		customer.changeAddress(newAddress);
		// Criando evento de mudança de endereço
		const addressChangedEvent = new CustomerAddressChangedEvent(customer);

		// Ao notificar o evento, o handler deve ser chamado e o console.log deve ser executado
		eventDispatcher.notify(addressChangedEvent);

		// Checando se os handlers foram chamados
		expect(spyEventHandlerAddress).toHaveBeenCalled();
	});
});
