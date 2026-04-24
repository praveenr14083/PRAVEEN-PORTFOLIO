import axios from "axios";
import { PortfolioData } from "@/types/portfolio";

const API_URL = "/api/portfolio";

export const portfolioService = {
  getPortfolioData: async (): Promise<PortfolioData> => {
    const response = await axios.get(API_URL);
    if (response.data.success) {
      return response.data.data as PortfolioData;
    }
    throw new Error(response.data.message || "Failed to fetch portfolio data");
  },
};
