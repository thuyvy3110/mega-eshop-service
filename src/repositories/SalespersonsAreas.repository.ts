import { SalespersonsAreas } from '../models/entities/SalespersonsAreas';
import { BaseRepository } from './BaseRepository.repository';

export class SalespersonsAreasRepository extends BaseRepository<SalespersonsAreas> {

	constructor() {
		super(SalespersonsAreas);
	}

	public saveBySalespersonId(salespersonId: any, saleAreaIds: number[], account: string) {
		saleAreaIds.map(async (saleAreaId: number) => {
			const record = new SalespersonsAreas();
			record.saleAreaId = saleAreaId;
			record.salespersonId = salespersonId;
			record.updatedBy = account;
			record.createdBy = account;
			await this.repository.save(record);
		});
	}

	public async deleteBySalespersonId(salespersonId: any) {
		return await this.repository.delete({ 'salespersonId': salespersonId });
	}
}