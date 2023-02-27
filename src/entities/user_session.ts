import { string } from "joi";
//import { nanoid } from 'nanoid'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { User_details } from "./user_details";
import { User } from "./user";
import { type } from "os";



@Entity()
export class user_session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id:number

  @Column()
  token: string;

  @Column()
  is_expired: boolean;

  @Column()
  created_at: Date;

  @Column()
  deleted_at: Date;


  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id"})
  user_id: User;
}
