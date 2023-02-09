import { Entity,Column,PrimaryGeneratedColumn,BaseEntity} from "typeorm";


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  age: Number;
  
  @Column()
  city: string;

  @Column()
  state: string;

}


