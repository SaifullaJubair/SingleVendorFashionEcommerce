import { Schema, model } from "mongoose";
import { IOrderInterface } from "./order.interface";

// order Schema
const orderSchema = new Schema<IOrderInterface>(
  {
    invoice_id: {
      required: true,
      type: String,
    },
    order_status: {
      required: true,
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancel",
        "return",
      ],
      default: "pending",
    },
    pending_time: {
      type: String,
    },
    processing_time: {
      type: String,
    },
    shipped_time: {
      type: String,
    },
    delivered_time: {
      type: String,
    },
    cancel_time: {
      type: String,
    },
    return_time: {
      type: String,
    },
    sub_total_amount: {
      required: true,
      type: Number,
    },
    shipping_cost: {
      required: true,
      type: Number,
    },
    discount_amount: {
      required: true,
      type: Number,
      default: 0,
    },
    grand_total_amount: {
      required: true,
      type: Number,
    },
    coupon_id: {
      type: Schema.Types.ObjectId,
      ref: "coupons",
    },
    shipping_location: {
      required: true,
      type: String,
    },
    billing_country: {
      required: true,
      type: String,
    },
    billing_city: {
      required: true,
      type: String,
    },
    billing_state: {
      required: true,
      type: String,
    },
    billing_address: {
      required: true,
      type: String,
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    customer_phone: {
      required: true,
      type: String,
    },
    order_updated_by: {
      type: Schema.Types.ObjectId,
      ref: "admins",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = model<IOrderInterface>("orders", orderSchema);

export default OrderModel;
