import { NotificationProps } from './notification';

export class NotificationError extends Error {
	constructor(public errors: Array<NotificationProps>) {
		super(errors.map((err) => `${err.context}: ${err.message}`).join(', '));
	}
}
