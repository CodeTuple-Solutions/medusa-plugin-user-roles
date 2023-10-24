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

  async removeUsersfromRole(user_id, role_idToRemove) {
    const userRepo = this.activeManager_.getRepository(User);
    const user = await userRepo.findOne({
      where: {
        id: user_id,
      },
    });
  
    if (!user) {
      return false;
    }
  
    if (user.role_id === role_idToRemove) {
      user.role_id = null; 
  
      await userRepo.save(user);
  
      return true;
    }
  
    return false; 
  }
  
}

export default UserService;
