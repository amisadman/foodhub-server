import { Router } from "express";
import authorization, { UserRole } from "../../middleware/authorization";
import { OrderController } from "./order.controller";

const router: Router = Router();

router.get(
  "/",
  authorization(UserRole.ADMIN, UserRole.USER),
  OrderController.getOrder,
);
router.post("/", authorization(UserRole.USER), OrderController.createOrder);

export const OrdersRoute = router;
