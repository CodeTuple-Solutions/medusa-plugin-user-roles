import { Request, Response } from "express";
import RoleService from "../../../../services/role";

export default async (req: Request, res: Response) =>{
    const id = req.body;
  const roleService = req.scope.resolve("roleService") as RoleService;
  const role = await roleService.DeleteRole(id);

  res.json({role});
}