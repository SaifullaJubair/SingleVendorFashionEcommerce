import { Types } from "mongoose";
import { IAdminInterface } from "../adminRegLog/admin.interface";
import { ICouponInterface } from "../coupon/coupon.interface";

export interface IOrderInterface {
  _id?: any;
  invoice_id: string;
  order_status: "pending" | "processing" | "shipped" | "delivered" | "cancel" | "return";
  pending_time?: string;
  processing_time?: string;
  shipped_time?: string;
  delivered_time?: string;
  cancel_time?: string;
  return_time?: string;
  billing_country: string;
  billing_city: string;
  billing_state: string;
  billing_address: string;
  shipping_location: string;
  sub_total_amount: number;
  discount_amount: number;
  shipping_cost: number;
  grand_total_amount: number;
  coupon_id?: Types.ObjectId | ICouponInterface;
  customer_id: Types.ObjectId | IAdminInterface;
  customer_phone: string;
  order_updated_by?: Types.ObjectId | IAdminInterface;
}

export const orderSearchableField = [
  "invoice_id",
  "order_status",
  "customer_phone",
];
