import { Request, Response } from "express";
import UserService from "../../../../services/user"

export default async (req: Request, res: Response) =>{
    const { user_id, id } = req.body;
  const userService = req.scope.resolve("userService") as UserService;
  const role = await userService.removeUsersfromRole(user_id,id);

  res.json({role});
}


