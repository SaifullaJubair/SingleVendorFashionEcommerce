import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { ISettingInterface } from "./setting.interface";
import { getSettingServices, postSettingServices, updateSettingServices } from "./setting.services";

// Add A Setting
export const postSetting: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<ISettingInterface | any> => {
    try {
        const data = req.body;
        if (data?._id) {
            const result = await updateSettingServices(data);
            if (result?.modifiedCount) {
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Setting Update successfully !'
                });
            } else {
                throw new ApiError(400, 'Setting Update failed !');
            }
        } else {
            const result = await postSettingServices(data);
            if (result) {
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Setting Update successfully !'
                });
            } else {
                throw new ApiError(400, 'Setting Update failed !');
            }
        }
    } catch (error: any) {
        next(error);
    }
};

// get A Setting
export const getSetting: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<ISettingInterface | any> => {
    try {
        const result = await getSettingServices();
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Setting Get successfully !',
            data: result
        });
    } catch (error: any) {
        next(error);
    }
};