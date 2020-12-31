import { PrimaryGeneratedColumn } from 'typeorm';
import { AuditableModel } from './Auditable.models';

// Structure for other models to based on (BaseModel)
export class BaseModel extends AuditableModel {
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;
}