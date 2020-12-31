import {Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

// Structure for other models to based on (BaseModel)
export class AuditableModel {

	@Column()
	createdBy: string;

	@CreateDateColumn()
	createdAt: any;

	@Column()
	updatedBy: string;

	@UpdateDateColumn()
	updatedAt: any;
}
