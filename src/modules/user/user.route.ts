import { Router } from "express";
import access, { UserRole } from "../../middleware/access";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", access(UserRole.ADMIN), UserController.getUsers);
router.get("/me", access(UserRole.USER, UserRole.ADMIN), UserController.getMe);
router.get(
  "/:id",
  access(UserRole.USER, UserRole.ADMIN),
  UserController.getUserWithId,
);
router.patch(
  "/:id",
  access(UserRole.USER, UserRole.ADMIN),
  UserController.updateUser,
);
router.patch(
  "/:id/status",
  access(UserRole.ADMIN),
  UserController.updateUserStatus,
);
router.delete("/:id", access(UserRole.ADMIN), UserController.deleteUser);

export const UserRouter: Router = router;
