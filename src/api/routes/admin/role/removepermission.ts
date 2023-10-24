import { Request, Response } from "express";
import RoleService from "../../../../services/role";

export default async (req: Request, res: Response) =>{
    const { role_id, permission_id } = req.body;
  const roleService = req.scope.resolve("roleService") as RoleService;
  const role = await roleService.removePermission(role_id,permission_id);

  res.json({role});
}