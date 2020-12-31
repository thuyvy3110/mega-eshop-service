import {Column, Entity, Index, JoinColumn, ManyToOne} from 'typeorm';
import {BaseModel} from '../Base.models';
import {Products} from './Products';

@Index('product_id_field_name_UNIQUE', ['productId', 'fieldName'], {unique: true})
@Entity('product_imgs')
export class ProductImgs extends BaseModel {

		@Column()
		productId: number;

		@Column({length: 200})
		img: string;

		@Column({length: 45})
		fieldName: string;

		@ManyToOne(() => Products, (products) => products.productImgs, {
				onDelete: 'NO ACTION',
				onUpdate: 'NO ACTION',
		})
		@JoinColumn([{name: 'product_id', referencedColumnName: 'id'}])
		product: Products;
}
