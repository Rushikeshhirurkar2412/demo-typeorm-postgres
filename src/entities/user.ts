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
} from "typeorm";
import { User_details } from "./user_details";
import { user_session } from "./user_session";

export enum role {
  USER='user',
  SUPER_ADMIN='super_admin'
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id:number

  @Column({
    type: 'enum',
    enum: role,
    default: role.USER
  })
  role: role

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  email_verification_token: string

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

  @OneToOne(() => User_details, (Userdetails) => Userdetails.user)
  @JoinColumn({ name: "id" })
  UserDetails: User_details;

  @OneToMany(() => user_session, (user_session) => user_session.user_id)
  @JoinColumn({ name: "id"})
  userSession: user_session;
}
