import { Request, Response } from "express";
import PermissionService from "../../../../services/permission";
export default async (req: Request, res: Response) => {
  const data = req.body;

  const permissionService = req.scope.resolve(
    "permissionService"
  ) as PermissionService;

  const role = await permissionService.createPermission({
    data,
  });

  res.json(role);
};
