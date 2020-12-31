import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseModel } from '../Base.models';
import { Clients } from './Clients';

@Index('language_UNIQUE', ['language'], { unique: true })
@Entity('languages')
export class Languages extends BaseModel {

	@Column({ length: 100 })
	language: string;

	@OneToMany(() => Clients, (clients) => clients.languageType2)
	clients: Clients[];
}
