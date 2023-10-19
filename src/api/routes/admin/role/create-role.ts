import { Request, Response } from "express";
import RoleService from "../../../../services/role";

export default async (req: Request, res: Response) => {
  // omitting validation for simplicity
  const { name } = req.body;

  const roleService = req.scope.resolve("roleService") as RoleService;

  const role = await roleService.create({
    name,
  });

  res.json(role);
};
