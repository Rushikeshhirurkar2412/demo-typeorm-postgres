import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, ManyToOne, OneToMany} from "typeorm";
import { Product } from "./product";


@Entity()
export class category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column()
  parent_category_id: number;

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

@OneToMany(()=>Product,(Product)=>Product.id)
product_id:Product
}

