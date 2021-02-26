import { Column, Entity } from 'typeorm';
import { BaseModel } from '../Base.models';

@Entity('customers')
export class Customers extends BaseModel {

	@Column({ length: 100 })
	type: string;
}
