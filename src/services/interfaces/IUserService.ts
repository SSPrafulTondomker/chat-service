import GetTransactionRequest from "../../request/GetTransactionsRequest";
import TransferBalanceRequest from "../../request/TransferBalanceRequest";
import GetTransactionResponse from "../../response/GetTransactionsResponse";
import TransferBalanceResponse from "../../response/TransferBalanceResponse";

export default interface IUserService {
    getTransactions(getTransactions: GetTransactionRequest): Promise<GetTransactionResponse[]>;
    transferBalance(transferBalanceRequest: TransferBalanceRequest): Promise<TransferBalanceResponse>;
}