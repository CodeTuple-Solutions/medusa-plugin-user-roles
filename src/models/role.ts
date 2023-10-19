import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { User } from "./user";
import { Permission } from "./permission";

@Entity()
export class Role extends BaseEntity {
  @Column({ type: "varchar" })
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "role_permissions",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "id",
    },
  })
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.teamRole)
  @JoinColumn({ name: "id", referencedColumnName: "role_id" })
  users: User[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "role");
  }
}
