import { BaseEntity, Column, Entity ,JoinColumn,OneToOne,PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class User_details extends BaseEntity {
    @PrimaryGeneratedColumn()
  
    id: Number;

    @Column()
    age: Number;
    
    @Column()
    city: string;
  
    @Column()
    state: string;

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

@OneToOne(()=>User,(user)=>user.id)
@JoinColumn({name:"user_id"})
    user:User


}
