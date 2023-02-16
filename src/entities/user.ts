import { string } from "joi";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User_details } from "./details";


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  first_name: string;

  @Column()
  lname_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  is_active: boolean;

  @Column()
  is_deleted: boolean;

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

  @OneToOne(() => User_details, (User_details) => User_details.user)
  @JoinColumn({ name: "id" })
  UserDetails: User_details;
}
