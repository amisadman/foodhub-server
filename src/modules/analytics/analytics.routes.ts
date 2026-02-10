import { Router } from "express";
import authorization, { UserRole } from "../../middleware/authorization";
import { AnalyticsController } from "./analytics.controller";

const router : Router = Router();
router.get("/",authorization(UserRole.ADMIN,UserRole.PROVIDER),AnalyticsController.getAnalytics)

export const AnalyticsRoute = router;