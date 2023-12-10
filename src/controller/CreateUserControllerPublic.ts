import { Request, Response } from "express";
import GetTransactionRequest from "../request/GetTransactionsRequest";
import IUserService from "../services/interfaces/IUserService";
import ErrorMapper from "../utils/ErrorMapper";
import joi from "joi";


/**
 * JavaScript is an interpreted language
 * */
class CreateUserControllerPublic {
    private userService: IUserService;

    constructor (userService: IUserService) {
        this.userService = userService;
    }

    async handleRequest(req: Request, res: Response) {
        try {
            const validatedInput = joi.attempt({ query: req.query, params: req.params}, CreateUserControllerPublic.requestSchema());
            const request: GetTransactionRequest = CreateUserControllerPublic.getValidatedRequest(validatedInput);
            const response: any = await this.userService.getTransactions(request);
            return res.status(200).send(response);
        } catch (err: any) {
            return ErrorMapper.mapResponseCode(err, res);
        }
    }

    private static getValidatedRequest(req: any) : GetTransactionRequest {
        return new GetTransactionRequest(parseInt(req.query.skip) as number, parseInt(req.query.limit) as number, req.params.walletId);
    }

    static requestSchema(): joi.Schema {
        return joi.object({
            query: joi.object({
                skip: joi.number().min(0),
                limit: joi.number().min(0).max(50),
            }),
            params: joi.object({
                walletId: joi.string()
            })
        }).required();
    }
}

export default CreateUserControllerPublic;