import { afterAll, beforeEach, describe, expect, it } from '@jest/globals';
import { Notification } from './notification';

/**
 * Estrutura de testes Unitários para Notification
 */
describe('[Unit] tests for notification', () => {
	it('should create errors', async () => {
		const notification = new Notification();
		const firstError = { message: 'Error message', context: 'Customer' };
		notification.addError(firstError);

		// Validação do primeiro erro
		expect(notification.getErrors('Customer')).toEqual(
			'Customer: Error message',
		);
		const secondError = {
			message: 'Second error message',
			context: 'Customer',
		};
		notification.addError(secondError);

		// Validação do segundo erro
		expect(notification.getErrors('Customer')).toEqual(
			'Customer: Error message, Customer: Second error message',
		);

		const thirdError = {
			message: 'Third error message',
			context: 'Order',
		};
		notification.addError(thirdError);

		// Validação do terceiro erro
		expect(notification.getErrors('Order')).toEqual(
			'Order: Third error message',
		);
	});

	it('should return all errors when no context is provided', async () => {
		const notification = new Notification();
		const firstError = { message: 'Error message', context: 'Customer' };
		notification.addError(firstError);
		const secondError = {
			message: 'Second error message',
			context: 'Customer',
		};
		notification.addError(secondError);
		expect(notification.getErrors()).toEqual(
			'Customer: Error message, Customer: Second error message',
		);

		const thirdError = {
			message: 'Third error message',
			context: 'Order',
		};
		notification.addError(thirdError);
		expect(notification.getErrors()).toEqual(
			'Customer: Error message, Customer: Second error message, Order: Third error message',
		);
	});

	it('should check if the errors has at least one error', async () => {
		const notification = new Notification();
		expect(notification.hasErrors()).toBe(false);

		const firstError = { message: 'Error message', context: 'Customer' };
		notification.addError(firstError);
		expect(notification.hasErrors()).toBe(true);
	});

	it('should get all errors props', () => {
		const notification = new Notification();
		const firstError = { message: 'Error message', context: 'Customer' };
		notification.addError(firstError);
		const secondError = {
			message: 'Second error message',
			context: 'Customer',
		};
		notification.addError(secondError);
		const thirdError = {
			message: 'Third error message',
			context: 'Order',
		};
		notification.addError(thirdError);
		expect(notification.getErrorsList()).toEqual([
			{ message: 'Error message', context: 'Customer' },
			{ message: 'Second error message', context: 'Customer' },
			{ message: 'Third error message', context: 'Order' },
		]);
	});
});
