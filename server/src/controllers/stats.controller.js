import * as statsService from "../services/stats.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getStats = async (req, res, next) => {
  try {
    const stats = await statsService.getStats();
    return successResponse(res, stats, "Stats fetched successfully");
  } catch (err) {
    next(err);
  }
};
