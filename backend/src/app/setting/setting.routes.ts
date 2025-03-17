import express from "express";
import { verifyToken } from "../../middlewares/verify.token";
import { getSetting, postSetting } from "./setting.controllers";
const router = express.Router();

// Create, update and get  setting
router.route("/").get(getSetting).patch(verifyToken("site_setting_update"), postSetting);

export const SettingRoutes = router;
