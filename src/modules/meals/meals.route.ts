import { Router } from "express";
import { MealsController } from "./meals.provider";
import access, { UserRole } from "../../middleware/access";

const router: Router = Router();

router.get("/", MealsController.getMeals);
router.post("/", access(UserRole.PROVIDER), MealsController.createMeal);

export const MealsRoute = router;
