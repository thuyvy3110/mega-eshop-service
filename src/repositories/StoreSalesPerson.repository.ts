import { StoreSalespersons } from '../models/entities/StoreSalespersons';
import { SalePerson } from '../models/entities/Salespersons';
import { BaseRepository } from './BaseRepository.repository';
import { createQueryBuilder, LessThan } from 'typeorm';
import { Stores } from '../models/entities/Stores';
import { getRepository } from 'typeorm';
import { StoreRepository } from './Store.repository'
import { SalespersonRepository } from './SalesPerson.repository'

export class StoreSalespersonsRepository extends BaseRepository<StoreSalespersons> {

    storeRepository: StoreRepository;
    salesPersonRepository: SalespersonRepository;

	constructor () {
		super(StoreSalespersons);
		this.storeRepository = new StoreRepository();
		this.salesPersonRepository = new SalespersonRepository()
    }

    public async findByClientId (clientId: number) {
        const result: Array<StoreSalespersons> = [];
        await this.repository.createQueryBuilder('ssp')
            .innerJoinAndSelect('salespersons', 'sp', 'sp.id = ssp.salespersonId')
            .innerJoinAndSelect('stores', 's', 's.id = ssp.storeId')
            .where(`s.client_id = :client_id`)
            .setParameter('client_id', clientId)
            .orderBy('ssp.updatedAt', 'DESC')
            .getRawMany()
            .then(items => {
                items.forEach( (item: any) => {
                    const ssp = new StoreSalespersons();
                    ssp.createdAt = item.ssp_created_at;
                    ssp.updatedAt = item.ssp_updated_at;
                    ssp.createdBy = item.ssp_created_by;
                    ssp.updatedBy = item.ssp_updated_by;
                    ssp.id = item.ssp_id;
                    ssp.storeId = item.ssp_store_id;
                    ssp.salespersonId = item.ssp_salesperson_id;

                    ssp.store = new Stores();
                    ssp.store.id = item.s_id;
                    ssp.store.storeName = item.s_store_name;
                    ssp.store.officer = item.s_officer;

                    const ssp1 = new SalePerson();
                    ssp1.id = item.sp_id;
                    ssp1.name = item.sp_name;
                    ssp.salesperson = ssp1;

                    result.push(ssp);
                })
            });

        let mapResult = new Map();
        result.forEach( (r: any) => {
            if (!mapResult.get(r.storeId)) {
                r['salespersons'] = [];
                mapResult.set(r.storeId, r);
            }
            let d = mapResult.get(r.storeId);
            d['salespersons'].push(r.salesperson);
        })

        return Array.from(mapResult.values());
    }

    private async getSalespersonIdByStoreSalesperson (storeId: number, clientId: number): Promise<Array<number>> {
        const salespersonId: Array<number> = [];
        await this.repository.createQueryBuilder('ssp')
        .innerJoinAndSelect(StoreSalespersons, 'sp', 'sp.store_id = ssp.store_id')
        .innerJoinAndSelect(Stores, 's', 's.id = ssp.storeId')
        .where(`s.client_id = :client_id AND sp.store_id = ${ storeId }`)
        .setParameter('client_id', clientId)
        .orderBy('ssp.updatedAt', 'DESC')
        .select('ssp.salespersonId')
        .getMany().then(data => {
            data.forEach((element: any) => salespersonId.push(element.salespersonId));
        })

        if (salespersonId.length < 0)
            return []

        return salespersonId
    }

    private async getSalespersonId (clientId: number): Promise<Array<object>> {
        const salesperson: Array<object> = [];
        await getRepository(SalePerson)
                            .createQueryBuilder("salespersons")
                            .where(`client_id = ${clientId}`)
                            .getMany().then(data => {
                                data.forEach((element: any) => salesperson.push(element));
                            })

        if (salesperson.length < 0)
            return []

        return salesperson
    }

    public async findActiveSalePersonInStore(storeId: number, clientId: number) {
        const salespersonIdInStoreSalesperson: Array<number> = await this.getSalespersonIdByStoreSalesperson(storeId, clientId)
        try {
            if (salespersonIdInStoreSalesperson.length > 0) {
                return await getRepository(SalePerson)
                                .createQueryBuilder("salespersons")
                                .where(`salespersons.id IN (${salespersonIdInStoreSalesperson})`)
                                .getMany();
            }
            else
                return [];
        }
        catch (err) {
            console.log(err)
        }
    }

    public async findInActiveSalePersonInStore(storeId: number, clientId: number) {
        const inActiveSalespersonId: Array<number> = await this.getSalespersonIdByStoreSalesperson(storeId, clientId)
        const salesperson: Array<object> = await this.getSalespersonId(clientId)
        try {
            if (inActiveSalespersonId.length > 0) {
                return await getRepository(SalePerson)
                            .createQueryBuilder("salespersons")
                            .where(`salespersons.id NOT IN (${inActiveSalespersonId}) AND salespersons.clientId == ${clientId}`)
                            .getMany();
            }
            else if (salesperson.length > 0 && salesperson[0] !== undefined)
                return salesperson;
            else
                return [];
        }
        catch (err) {
            console.log(err)
        }
    }

    public async addSalePersonToStore(storeId: number, salesPersonId: number[], author: string) {
        await createQueryBuilder()
            .delete()
            .from(StoreSalespersons)
            .where("store_id = :storeId", {storeId: storeId})
            .execute();
        const rows = salesPersonId.map(sp => {
            const r = new StoreSalespersons();
            r.storeId = storeId;
            r.salespersonId = sp;
            r.updatedBy = author;
            r.createdBy = author;
            return r;
        })
        return await this.repository.save(rows);
    }

    public async getDataByIdOfRowTable (rowId: number) {
        const data = await this.repository.findOne(rowId);
        if (!data) {
            return {};
        }
        const store = await this.storeRepository.findOneById(data.storeId);
        if (!store) {
            return {};
        }
        data.store = store ?? null;
        const storeSalespersons = await this.repository.find({
            where: {
                storeId: data.storeId
            }
        })
        const salesPersonIds = storeSalespersons.map(item => item.salespersonId);
        const salesPersons = await this.salesPersonRepository.findByIds(salesPersonIds)
        data.salesperson = salesPersons;

        return data;
    }

    public async findBySalePersonId(id: number) {
	    return await this.repository.find({
            where: {
                salespersonId: id
            }
        })
    }

    public async deleteByStoreId (storeId: number) {
        await createQueryBuilder()
            .delete()
            .from(StoreSalespersons)
            .where(`store_id IN (${storeId})`)
            .execute();
    }
}