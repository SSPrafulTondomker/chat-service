import { Request, Response } from "express";
import TransferBalanceRequest from "../request/TransferBalanceRequest";
import IUserService from "../services/interfaces/IUserService";
import ErrorMapper from "../utils/ErrorMapper";
import joi from "joi";


/**
 * JavaScript is an interpreted language
 * */
class UserLogoutControllerPublic {
    private userService: IUserService;

    constructor (userService: IUserService) {
        this.userService = userService;
    }

    async handleRequest(req: Request, res: Response) {
        try {
            const validatedInput = joi.attempt({ body: req.body}, UserLogoutControllerPublic.requestSchema());

            const request: TransferBalanceRequest = UserLogoutControllerPublic.getValidatedRequest(validatedInput);
            const response: any = await this.userService.transferBalance(request);
            return res.status(200).send(response);
        } catch (err: any) {
            return ErrorMapper.mapResponseCode(err, res);
        }
    }

    private static getValidatedRequest(req: any) : TransferBalanceRequest {
        return new TransferBalanceRequest(req.body.amount, req.body.description, req.body.walletId);
    }

    static requestSchema(): joi.Schema {
        return joi.object({
            body: joi.object({
                amount: joi.number(),
                description: joi.string().max(100),
                walletId: joi.string().max(100)
            })
        }).required();
    }
}

export default UserLogoutControllerPublic;