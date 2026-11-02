import { Notification } from '../notification/notification';

export abstract class Entity {
	protected _id: string;
	public _notification: Notification;

	constructor() {
		this._notification = new Notification();
	}
}
