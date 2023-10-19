import { TransactionBaseService } from "@medusajs/medusa";
import { Role } from "../models/role";
import RoleRepository from "../repositories/role";
import PermissionService, {
  CreatePayload as PermissionCreatePayload,
} from "./permission";
import UserService from "./user";
import { Any } from "typeorm";

type CreatePayload = Pick<Role, "name"> & {
  permissions?: PermissionCreatePayload[];
};

type InjectedDependencies = {
  roleRepository: typeof RoleRepository;
  permissionService: PermissionService;
  userService: UserService;
};

class RoleService extends TransactionBaseService {
  protected readonly roleRpository_: typeof RoleRepository;
  protected readonly permissionService_: PermissionService;
  protected readonly userService_: UserService;

  constructor(container: InjectedDependencies) {
    super(container);

    this.roleRpository_ = container.roleRepository;
    this.permissionService_ = container.permissionService;
    this.userService_ = container.userService;
  }

  async listRoles(): Promise<Role[]> {
    const roleRepo = this.manager_.withRepository(this.roleRpository_);
    return await roleRepo.find();
  }

  async DeleteRole(id) {
    // Extract the value from the id object
    const roleId = id.value;
    
    const roleRepo = this.manager_.withRepository(this.roleRpository_);
    const role = await roleRepo.findOne({
      where: { id: roleId },
    });
  
    if (role) {
      await roleRepo.remove(role);
    } else {
      // Handle the case where the role with the given ID doesn't exist
      throw new Error("Role not found");
    }
  }
  

  async retrieve1(id: string): Promise<Role> {
    // for simplicity, we retrieve all relations
    // however, it's best to supply the relations
    // as an optional method parameter
    const roleRepo = this.manager_.withRepository(this.roleRpository_);
    return await roleRepo.findOne({
      where: {
        id,
      },
      relations: ["permissions", "users"],
    });
  }

  async create(name: any) {
    // return this.atomicPhase_(async (manager) => {
    // omitting validation for simplicity
    // const { permissions: permissionsData = [] } = data
    // delete data.permissions

    const roleRepo = this.manager_.withRepository(this.roleRpository_);
    const role = roleRepo.create(name);

    // role.permissions = [];

    // for (const permissionData of permissionsData) {
    //   role.permissions.push(
    //     await this.permissionService_.create(permissionData)
    //   );
    // }{"/roles/get-roles": true}
    const result = await roleRepo.save(role);

    return result;
    // });
  }

  async updateRolePermissions(id, updatedData) {
    const roleRepo = this.manager_.withRepository(this.roleRpository_);
    const role = await roleRepo.findOne({
      where: {
        id,
      },
      relations: ["permissions"], // Load the existing permissions
    });

    if (role.permissions) {
      // Append the updated permissions to the existing ones
      role.permissions.push(...updatedData);
    } else {
      // If no existing permissions, assign the updated data
      role.permissions = updatedData;
    }

    // Save the updated role
    const result = await roleRepo.save(role);

    return result;
  }

  async associateUser(role_id: string, user_id: string): Promise<Role> {
    return this.atomicPhase_(async () => {
      await this.userService_.update(user_id, {
        role_id,
      });

      return await this.retrieve1(role_id);
    });
  }
}

export default RoleService;
