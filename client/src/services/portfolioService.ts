import axios from "axios";
import { PortfolioData, fallbackData } from "@/utils/data";

const API_URL = "/api/portfolio/data";

export const portfolioService = {
  getPortfolioData: async (): Promise<PortfolioData> => {
    try {
      const response = await axios.get("/api/portfolio");
      if (response.data.success) {
        return response.data.data as PortfolioData;
      }
      return fallbackData;
    } catch (error) {
      console.error("Portfolio Service Error:", error);
      return fallbackData;
    }
  },
};
