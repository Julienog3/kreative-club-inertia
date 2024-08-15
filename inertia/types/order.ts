import OrderRequest from "#models/order_request";
import { BaseModel, User } from ".";

export interface Order extends BaseModel {
  customerId: string
  customer: User,
  sellerId: string
  seller: User
  step: string,
  paidAt: string
  messages: any[]
}

export interface OrderRequest extends BaseModel {
  
}