import { Router } from "express";
import { wrapHandler } from "@medusajs/medusa";
import customRouteHandler from "./custom-route-handler";
import roleRouter from "./role"
// Initialize a custom router
const router = Router();

export function attachAdminRoutes(adminRouter: Router) {
  // Attach our router to a custom path on the admin router
  adminRouter.use("/custom", router);

  // Define a GET endpoint on the root route of our custom path
  router.get("/", wrapHandler(customRouteHandler));

  // Attach routes for roles experience, defined separately
  roleRouter(adminRouter);
}
