import { Category } from "./category";
import { PortfolioFolder, PortfolioImage } from "./portfolio";

export type State = "danger" | "success" | "warning";

export interface BaseModel {
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface User extends BaseModel {
  username: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  avatar: string | null
  categories?: Category[]
  portfolioImages?: PortfolioImage[]
  portfolioFolders?: PortfolioFolder[]
  bookmarks?: Bookmark[]
}

interface Bookmark {
  id: string
  creativeId: string
  userId: string
}