import { BaseModel } from ".";

export interface PortfolioImage extends BaseModel {
  title: string;
  image: string;
  userId: string;
  isIllustration: boolean;
  portfolioFolderId?: string;
}

export interface PortfolioFolder extends BaseModel {
  title: string;
  description?: string;
  userId: string;
  portfolioImages?: PortfolioImage[];
}
