import { TransactionBaseService } from "@medusajs/medusa";
import { Permission } from "../models/permission";
import PermissionRepository from "../repositories/permission";

export type CreatePayload = Pick<Permission, "name" | "metadata">;

type InjectedDependencies = {
  permissionRepository: typeof PermissionRepository;
};

class PermissionService extends TransactionBaseService {
  protected readonly permissionRepository_: typeof PermissionRepository;

  constructor(container: InjectedDependencies) {
    super(container);
    this.permissionRepository_ = container.permissionRepository;
  }

  async listPermission(): Promise<Permission[]> {
    const permissionRepo = this.manager_.withRepository(
      this.permissionRepository_
    );
    return await permissionRepo.find();
  }

  async createPermission(data) {
    const permissionRepo = this.manager_.withRepository(
      this.permissionRepository_
    );
    console.log(data)
    const permission = permissionRepo.create({name:data.data.name,metadata:data.data.metadata});
    console.log(permission)

    const result = await permissionRepo.save(permission);

    return result;
  }
}

export default PermissionService;
