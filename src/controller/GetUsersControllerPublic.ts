import { Request, Response } from "express";
import IMessageService from "../services/interfaces/IMessageService";
import SetUpWalletRequest from "../request/SetUpWalletRequest";
import SetUpWalletResponse from "../response/SetUpWalletResponse";
import ErrorMapper from "../utils/ErrorMapper";
import joi from "joi";
import IUserService from "../services/interfaces/IUserService";


/**
 * JavaScript is an interpreted language
 * */
class GetUsersControllerPublic {
    private userService: IUserService;

    constructor (userService: IUserService) {
        this.userService = userService;
    }

    async handleRequest(req: Request, res: Response) {
        try {
            const validatedInput = joi.attempt({ body: req.body}, GetUsersControllerPublic.requestSchema());
            const request: SetUpWalletRequest = GetUsersControllerPublic.getValidatedRequest(validatedInput);
            const response: SetUpWalletResponse = await this.walletService.setUpWallet(request);
            return res.status(200).send(response);
        } catch (err: any) {
            return ErrorMapper.mapResponseCode(err, res);
        }
    }

    private static getValidatedRequest(req: any) : SetUpWalletRequest {
        return new SetUpWalletRequest(req.body.balance, req.body.name);
    }

    static requestSchema(): joi.Schema {
        return joi.object({
            body: joi.object({
                balance: joi.number().positive().min(0),
                name: joi.string().max(100),
            })
        }).required();
    }
}

export default GetUsersControllerPublic;