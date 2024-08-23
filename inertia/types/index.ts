import { Category } from "./category";
import { PortfolioFolder, PortfolioImage } from "./portfolio";

export type State = "danger" | "success" | "warning";

export interface BaseModel {
  createdAt: string;
  updatedAt: string;
  id: string;
}

type Role = 'user' | 'admin'

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
  portfolioImageAsThumbnail: PortfolioImage[],
  bookmarks: Bookmark[]
  portfolioEnabled?: boolean
  description?: string
  role: Role,
  isBookmarked?: boolean
  sales?: Order[]
}

interface Bookmark {
  id: string
  creativeId: string
  userId: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Serialize } from '@tuyau/utils/types';
import AdminController from "../../app/controllers/admin_controller"
import { Order } from "./order";

type InferPageProps<Controller, Method extends keyof Controller> = Controller[Method] extends (
  ...args: any[]
) => any ? Serialize<Exclude<Awaited<ReturnType<AdminController['users']>>, string | void>> : never;

export type ControllerProps<
  Controller,
  Method extends keyof Controller,
> = InferPageProps<Controller, Method>;

/* eslint-enable @typescript-eslint/no-explicit-any */