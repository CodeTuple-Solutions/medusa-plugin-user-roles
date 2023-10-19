import { Request, Response } from "express";
import RoleService from "../../../../services/role";

export default async (req: Request, res: Response) => {
  // omitting validation for simplicity purposes
  const { id } = req.params;
  const user_id = req.body;
  const roleService = req.scope.resolve("roleService") as RoleService;
  const role = await roleService.associateUser(id, user_id);

  res.json(role);
};
