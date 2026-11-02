export type NotificationProps = {
	message: string;
	context: string;
};

export class Notification {
	private errors: Array<NotificationProps> = [];

	/**
	 * Adiciona um erro à lista de erros
	 * @param error - Objeto contendo a mensagem e o contexto do erro
	 */
	addError(error: NotificationProps): void {
		this.errors.push(error);
	}

	/**
	 * Retorna os erros filtrados pelo contexto
	 * @param context - Contexto para filtrar os erros
	 * @returns - String contendo os erros filtrados pelo contexto
	 */
	getErrors(context?: string): string {
		let message = '';
		let errors = this.errors;
		if (context) {
			errors = this.errors.filter((err) => err.context === context);
		}
		message = errors.map((err) => `${err.context}: ${err.message}`).join(', ');
		return message;
	}

	/**
	 * Verifica se há pelo menos um erro na lista de erros
	 * @returns - true se houver pelo menos um erro, false caso contrário
	 */
	hasErrors(): boolean {
		return this.errors.length > 0;
	}

	/**
	 * Retorna a lista de erros
	 * @returns - Array contendo os erros
	 */
	getErrorsList(): Array<NotificationProps> {
		return this.errors;
	}
}
