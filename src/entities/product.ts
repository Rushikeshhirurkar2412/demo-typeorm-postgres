import { Entity,Column,PrimaryGeneratedColumn,BaseEntity} from "typeorm";


@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  Product_name: string;

  @Column()
  description: string;

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
}

