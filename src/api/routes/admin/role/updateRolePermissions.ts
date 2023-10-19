import { Request, Response } from "express";
import RoleService from "../../../../services/role";

export default async (req: Request, res: Response) => {
  // omitting validation for simplicity
  const id = req.params.id;
  const updatedData = req.body;
  const roleService = req.scope.resolve("roleService") as RoleService;

  const role = await roleService.updateRolePermissions(id, updatedData);

  res.json(role);
};
