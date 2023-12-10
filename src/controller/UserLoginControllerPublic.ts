import { Request, Response } from "express";
import IMessageService from "../services/interfaces/IMessageService";
import GetWalletRequest from "../request/GetWalletRequest";
import ErrorMapper from "../utils/ErrorMapper";
import joi from "joi";
import IUserService from "../services/interfaces/IUserService";


/**
 * JavaScript is an interpreted language
 * */
class UserLoginControllerPublic {
    private userService: IUserService;

    constructor (userService: IUserService) {
        this.userService = userService;
    }

    async handleRequest(req: Request, res: Response) {
        try {
            const validatedInput = joi.attempt({ params: req.params}, UserLoginControllerPublic.requestSchema());
            const request: GetWalletRequest = UserLoginControllerPublic.getValidatedRequest(validatedInput);
            const response: any = await this.userService.getWallet(request);
            return res.status(200).send(response);
        } catch (err: any) {
            return ErrorMapper.mapResponseCode(err, res);
        }
    }

    private static getValidatedRequest(req: any) : GetWalletRequest {
        return new GetWalletRequest(req.params.id);
    }

    static requestSchema(): joi.Schema {
        return joi.object({
            params: joi.object({
                id: joi.string().max(100)
            })
        }).required();
    }
}

export default UserLoginControllerPublic;