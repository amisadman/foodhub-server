import { Router } from "express";
import { MealsController } from "./meals.provider";
import  authorization, { UserRole } from "../../middleware/authorization";

const router: Router = Router();

router.get("/", MealsController.getMeals);
router.post("/", authorization(UserRole.PROVIDER), MealsController.createMeal);

export const MealsRoute = router;
