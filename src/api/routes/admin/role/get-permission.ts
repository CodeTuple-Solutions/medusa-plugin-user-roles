import { Request, Response } from "express";
import PermissionService from "../../../../services/permission";

export default async (req: Request, res: Response) =>{
  const permissionService = req.scope.resolve("permissionService") as PermissionService;
  const permission = await permissionService.listPermission();

  res.json({permission});
}

