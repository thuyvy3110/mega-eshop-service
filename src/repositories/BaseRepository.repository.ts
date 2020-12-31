import { DeepPartial, EntityTarget, FindConditions, FindManyOptions, getRepository, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<T> {

	public repository: Repository<T>;

	constructor(entity: EntityTarget<T>) {
		this.repository = getRepository(entity);
	}

	async findAll() {
		return this.repository.find();
	}

	async find (options?: FindManyOptions<T>) {
		return this.repository.find(options);
	}

	async findWithCondition (conditions?: FindConditions<T>) {
		return this.repository.find(conditions);
	}

	async findOneById (id?: string | number | Date, options?: FindOneOptions<any>) {
		return this.repository.findOne(id, options);
	}

	async findByIds(ids: string[] | number[]) {
		return this.repository.findByIds(ids);
	}

	// tslint:disable-next-line:max-line-length
	async delete (criteria: string | string[] | number | number[] | Date | Date[] | FindConditions<T>) {
		return this.repository.delete(criteria);
	}

	async deleteCascade (entity: {} | [] | any) {
		return this.repository.remove(entity);
	}

	async update(criteria: string | string[] | number | number[] | Date | Date[] | FindConditions<T>, partialEntity: QueryDeepPartialEntity<T>) {
		return await this.repository.update(criteria, partialEntity);
	}

	async insert (entity: QueryDeepPartialEntity<T> | (QueryDeepPartialEntity<T>[])) {
		return await this.repository.insert(entity);
	}

	// check before insert, and execute with relations and other operations.
	async upsert (entity: DeepPartial<T>) {
		return this.repository.save(entity);
	}

	// check before insert, and execute with relations and other operations.
	async upserts (entities: DeepPartial<T>[]) {
		return this.repository.save(entities);
	}
}