import { Step } from "#models/order_step";
import { BaseModel, User } from ".";
import { Category } from "./category";

export interface Order extends BaseModel {
  customerId: string
  customer: User,
  sellerId: string
  seller: User
  step: string,
  paidAt: string
  messages: any[]
  steps?: OrderStep[]
  products?: OrderProduct[]
  files?: OrderFile[]
  latestMessage: any
}

export interface OrderRequest extends BaseModel {
  orderId: string;
  order: Order;
  type: string;
  categories: Category[]
  description: string
  delay: string
}

export interface OrderProduct extends BaseModel {
  orderId: string;
  order: Order;
  name: Step;
  price: number;
  quantity: number;
  duration: number;
  details: string;
}

export interface OrderFile extends BaseModel {
  orderId: string;
  order: Order;
  file: string
}

export interface OrderStep extends Omit<BaseModel, 'updatedAt'> {
  orderId: string;
  order: Order;
  name: Step;
}


export interface Review extends BaseModel {
  orderId: string;
  order: Order;
  score: number;
  description: string;
}