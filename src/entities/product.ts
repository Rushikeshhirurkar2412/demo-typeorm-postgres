import { Entity,Column,PrimaryGeneratedColumn,BaseEntity} from "typeorm";


@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  Product__name: string;
}

