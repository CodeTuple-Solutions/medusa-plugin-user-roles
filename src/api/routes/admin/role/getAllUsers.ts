import { Request, Response } from "express";
import UserService from "../../../../services/user"
export default async (req: Request, res: Response) =>{
  const userService = req.scope.resolve("userService") as UserService;
  const users = await userService.list();

  res.json({users});
}