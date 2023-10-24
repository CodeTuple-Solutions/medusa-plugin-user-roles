import { wrapHandler } from "@medusajs/utils";
import { Router } from "express";
import create from "./create-role";
import associateUser from "./associate-user";
import listRoles from "./get-roles";
import listPermission from "./get-permission";
import reterieve1 from "./getRoleById";
import updateRolePermissions from "./updateRolePermissions";
import createPermission from "./createPermission";
import list from "./getAllUsers";
import DeleteRole from "./delete-role"
import removePermission from "./removepermission";
import removeUsersfromRole from "./remove-user";
const router = Router();

export default (adminRouter: Router) => {
  adminRouter.use("/roles", router);

  router.post("/create-role", wrapHandler(create));
  router.post("/:id/user", wrapHandler(associateUser));
  router.get("/get-roles", wrapHandler(listRoles));
  router.get("/get-permission", wrapHandler(listPermission));
  router.get("/get-rolepermissions/:id", wrapHandler(reterieve1));
  router.post("/update-permissions/:id", wrapHandler(updateRolePermissions));
  router.post("/createnewpermission", wrapHandler(createPermission));
  router.get("/getAllUsers", wrapHandler(list));
  router.post("/delete-role",wrapHandler(DeleteRole));
  router.post("/remove-permissions",wrapHandler(removePermission));
  router.post("/remove-users",wrapHandler(removeUsersfromRole));
};
