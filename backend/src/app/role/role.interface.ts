import { Types } from "mongoose";
import { IAdminInterface } from "../adminRegLog/admin.interface";

export interface IRoleInterface {
  _id?: any;
  role_name: string;
  role_publisher_id?: Types.ObjectId | IAdminInterface;
  role_updated_by?: Types.ObjectId | IAdminInterface;
  category_post?: true | false;
  category_update?: true | false;
  category_delete?: true | false;
  category_show?: true | false;
  sub_category_post?: true | false;
  sub_category_update?: true | false;
  sub_category_show?: true | false;
  sub_category_delete?: true | false;
  child_category_post?: true | false;
  child_category_update?: true | false;
  child_category_delete?: true | false;
  child_category_show?: true | false;
  brand_post?: true | false;
  brand_update?: true | false;
  brand_show?: true | false;
  brand_delete?: true | false;
  attribute_post?: true | false;
  attribute_update?: true | false;
  attribute_show?: true | false;
  attribute_delete?: true | false;
  specification_post?: true | false;
  specification_update?: true | false;
  specification_show?: true | false;
  specification_delete?: true | false;
  product_create?: true | false;
  product_update?: true | false;
  product_delete?: true | false;
  product_show?: true | false;
  offer_create?: true | false;
  offer_update?: true | false;
  offer_delete?: true | false;
  offer_show?: true | false;
  campaign_create?: true | false;
  campaign_update?: true | false;
  campaign_delete?: true | false;
  campaign_show?: true | false;
  user_create?: true | false;
  user_update?: true | false;
  user_delete?: true | false;
  user_show?: true | false;
  role_create?: true | false;
  role_update?: true | false;
  role_delete?: true | false;
  role_show?: true | false;
  review_update?: true | false;
  review_show?: true | false;
  question_update?: true | false;
  question_show?: true | false;
  coupon_create?: true | false;
  coupon_update?: true | false;
  coupon_delete?: true | false;
  coupon_show?: true | false;
  banner_create?: true | false;
  banner_update?: true | false;
  banner_delete?: true | false;
  banner_show?: true | false;
  slider_create?: true | false;
  slider_update?: true | false;
  slider_delete?: true | false;
  slider_show?: true | false;
  site_setting_update?: true | false;
  order_show?: true | false;
  order_update?: true | false;
  offer_order_update?: true | false;
  offer_order_show?: true | false;
  customer_create?: true | false;
  customer_update?: true | false;
  customer_delete?: true | false;
  customer_show?: true | false;

}
