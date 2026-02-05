import { Router } from "express";
import { ProviderController } from "./provider.controller";
import access, { UserRole } from "../../middleware/access";

const router: Router = Router();

router.get("/", ProviderController.getProviders);
router.post("/",access(UserRole.USER, UserRole.ADMIN), ProviderController.createProvider);
router.get("/:id", ProviderController.getProviderWithId);
router.patch("/:id", access(UserRole.USER, UserRole.ADMIN), ProviderController.editProvider);
router.delete("/:id", access(UserRole.USER, UserRole.ADMIN),ProviderController.deleteProvider);

export const ProviderRouter = router;
