import { Request, Response, NextFunction } from "express";
import { AnalyticsRoute } from "./analytics.routes";
import { UserRole } from "../../middleware/authorization";
import { sendResponse } from "../../utils/response";
import { AnalyticsService } from "./analytics.service";
import { ProviderService } from "../provider/provider.service";

const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = req.user?.role;

    if (role === UserRole.ADMIN) {
      const data = await AnalyticsService.getAnalytics();
      return sendResponse(
        res,
        200,
        true,
        "Analytics Fetched Successfully",
        data,
      );
    } else if (role === UserRole.PROVIDER) {
      const providerId = await ProviderService.getProviderIdWithUserId(
        req.user?.id as string,
      );
      const data = await AnalyticsService.getProviderAnalytics(providerId.id);
      return sendResponse(
        res,
        200,
        true,
        "Analytics Fetched Successfully",
        data,
      );
    }
  } catch (error) {
    next(error);
  }
};

export const AnalyticsController = {
  getAnalytics,
};
