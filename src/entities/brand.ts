import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import { Product } from "./product";


@Entity()
export class brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  brand_name: string;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @Column()
  deleted_by: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;

  @ManyToOne(()=>Product,(product)=>product.id)
  @JoinColumn({name:"product_id"})
  product:Product
}

