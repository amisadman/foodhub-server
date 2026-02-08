import { Router } from "express";
import { ProviderRouter } from "../modules/provider/provider.routes";
import { UserRouter } from "../modules/user/user.route";

const router: Router = Router();

router.use("/provider", ProviderRouter);
router.use("/user", UserRouter);

export const routes = router;
