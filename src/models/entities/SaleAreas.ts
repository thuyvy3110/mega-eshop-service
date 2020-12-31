import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseModel } from '../Base.models';
import { SalespersonsAreas } from './SalespersonsAreas';

@Index('sale_area_INDEX', ['clientId', 'area'], { unique: true })
@Entity('sale_areas')
export class SaleAreas extends BaseModel {

	@Column('bigint', { name: 'client_id' })
	clientId: string;

	@Column('varchar', { name: 'area', length: 100 })
	area: string;

	@OneToMany(
		() => SalespersonsAreas,
		(salespersonsAreas) => salespersonsAreas.saleArea
	)
	salespersonsAreas: SalespersonsAreas[];
}
