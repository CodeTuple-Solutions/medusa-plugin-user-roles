import { 
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
  } from "typeorm"
  import {
    // alias the core entity to not cause a naming conflict
    User as MedusaUser,
  } from "@medusajs/medusa"
  import { Role } from "./role"
  
  @Entity()
  export class User extends MedusaUser {
    @Index()
    @Column({ nullable: true })
    role_id: string | null
  
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    teamRole: Role | null
  }