import { Request, Response } from "express";
import GetTransactionRequest from "../request/GetTransactionsRequest";
import IUserService from "../services/interfaces/IUserService";
import ErrorMapper from "../utils/ErrorMapper";
import joi from "joi";
import IMessageService from "../services/interfaces/IMessageService";


/**
 * JavaScript is an interpreted language
 * */
class SendTextToGroupControllerPublic {
    private messageService: IMessageService;

    constructor (messageService: IMessageService) {
        this.messageService = messageService;
    }

    async handleRequest(req: Request, res: Response) {
        try {
            const validatedInput = joi.attempt({ query: req.query, params: req.params}, SendTextToGroupControllerPublic.requestSchema());
            const request: GetTransactionRequest = SendTextToGroupControllerPublic.getValidatedRequest(validatedInput);
            const response: any = await this.messageService.getTransactions(request);
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

export default SendTextToGroupControllerPublic;