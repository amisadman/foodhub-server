import { Response, Request, NextFunction } from "express";
import { UserRole } from "../../middleware/authorization";
import { OrderService } from "./order.service";
import { sendResponse } from "../../utils/response";

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role === UserRole.ADMIN) {
      const data = await OrderService.getOrders();
      return sendResponse(res, 200, true, "Order fetched successfully", data);
    } else if (req.user?.role === UserRole.USER) {
      const data = await OrderService.getOrderWithUserId(
        req.user?.id as string,
      );
      return sendResponse(res, 200, true, "Order fetched successfully", data);
    } else {
      throw new Error("Role not found.");
    }
  } catch (error) {
    next(error);
  }
};
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    const data = await OrderService.createOrder(req.body, userId as string);
    return sendResponse(res, 201, true, "Order Created successfully", data);
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  getOrder,
  createOrder,
};
