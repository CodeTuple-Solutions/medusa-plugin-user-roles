import { UserService as MedusaUserService, User } from "@medusajs/medusa";
import { UpdateUserInput } from "@medusajs/medusa/dist/types/user";

class UserService extends MedusaUserService {
  async update(
    userId: string,
    update: UpdateUserInput & {
      role_id?: string;
    }
  ): Promise<User> {
    return super.update(userId, update);
  }

  async list(): Promise<User[]> {
    const userRepo = this.activeManager_.getRepository(User);
    return await userRepo.find();
  }
}

export default UserService;
