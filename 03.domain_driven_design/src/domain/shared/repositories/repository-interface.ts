export interface RepositoryInterface<T> {
	save(entity: T): Promise<void>;
	update(entity: T): Promise<void>;
	find(id: string): Promise<T | null>;
	findAll(): Promise<Array<T>>;
	delete(id: string): Promise<void>;
}
