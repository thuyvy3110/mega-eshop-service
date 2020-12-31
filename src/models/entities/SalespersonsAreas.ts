import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../Base.models';
import { SaleAreas } from './SaleAreas';
import { SalePerson } from './Salespersons';

@Index('salesperson_areas_UNIQUE', ['salespersonId', 'saleAreaId'], {
	unique: true,
})
@Index('sale_area_id', ['saleAreaId'], {})
@Entity('salespersons_areas')
export class SalespersonsAreas extends BaseModel {

	@Column()
	salespersonId: number;

	@Column()
	saleAreaId: number;

	@ManyToOne(() => SaleAreas, (saleAreas) => saleAreas.salespersonsAreas, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'sale_area_id', referencedColumnName: 'id' }])
	saleArea: SaleAreas;

	@ManyToOne(
		() => SalePerson,
		(saleperson) => saleperson.salespersonsAreas,
		{ onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
	)
	@JoinColumn([{ name: 'salesperson_id', referencedColumnName: 'id' }])
	salesperson: SalePerson;
}
