import UserMetaDao from "../dao/UserMetaDao";
import {OperationType} from "../enumerations/OperationType";
import Message from "../models/Message";
import GetTransactionRequest from "../request/GetTransactionsRequest";
import TransferBalanceRequest from "../request/TransferBalanceRequest";
import GetTransactionResponse from "../response/GetTransactionsResponse";
import TransferBalanceResponse from "../response/TransferBalanceResponse";
import IUserService from "./interfaces/IUserService";
import MessageTransferDto from "../dto/MessageTransferDto";
import {v4 as uuidv4} from "uuid";
import GroupMessage from "../models/GroupMessage";
import MessageDao from "../dao/MessageDao";
import MessageDto from "../dto/MessageDto";
import WalletBalanceError from "../errors/WalletBalanceError";
import WalletConstants from "../constants/WalletConstants";

class UserServiceImpl implements IUserService {
    walletDao: MessageDao;
    transactionDao: UserMetaDao;

    constructor(walletDao: MessageDao, transactionDao: UserMetaDao) {
        this.walletDao = walletDao;
        this.transactionDao = transactionDao;
    }

    async getTransactions(getTransactionRequest: GetTransactionRequest): Promise<GetTransactionResponse[]> {
        let transactions: Message[] =  await this.transactionDao.getTransactionsByWalletId(getTransactionRequest.walletId, getTransactionRequest.limit, getTransactionRequest.skip);
        let getTransactions: GetTransactionResponse[] = [];
        for (let transaction of transactions) {
            getTransactions.push(new GetTransactionResponse(
                transaction.messageId,
                transaction.createdBy,
                transaction.amount / WalletConstants.DECIMAL_CONSTANT,
                transaction.balance / WalletConstants.DECIMAL_CONSTANT,
                transaction.updatedAt,
                transaction.groupId,
                transaction.operationType
                 ));
        }
        return getTransactions;
    }
    async transferBalance(transferBalanceRequest: TransferBalanceRequest): Promise<TransferBalanceResponse> {
        const wallet: GroupMessage | null = await this.walletDao.getReceivedMessagesByUserName(transferBalanceRequest.walletId);
        if (wallet == null) {
            throw new WalletBalanceError("unable to get wallet", 400)
        }
        const operationType: OperationType = this.isCredit(transferBalanceRequest.amount) ? OperationType.CREDIT: OperationType.DEBIT;
        const normalisedAmount: number = transferBalanceRequest.amount * WalletConstants.DECIMAL_CONSTANT;

        if (this.isWalletBalanceInSufficientAmount(operationType, wallet.messageId, normalisedAmount)) {
            throw new WalletBalanceError( "wallet balance insufficient amount" , 400)
        }

        if (this.isWalletTransactionAllowed(transferBalanceRequest.amount)) {
            throw new WalletBalanceError( "debit value is zero transaction not allowed" , 400)
        }

        const timeStamp: number = Date.now();


        const transactionDto: MessageTransferDto = new MessageTransferDto(uuidv4(), normalisedAmount, wallet.messageId);

        const walletDto: MessageDto = new MessageDto(
            wallet.walletId,
            wallet.groupId,
            normalisedAmount + wallet.messageId,
            wallet.createdAt,
            wallet.updatedAt
        );

        await this.transactionDao.transferWalletBalance(transactionDto, walletDto);

        return new TransferBalanceResponse(transactionDto.transactionId, walletDto.balance/ WalletConstants.DECIMAL_CONSTANT);
    }

    private isCredit(amount: number): boolean {
        return amount > 0;
    }

    private isWalletTransactionAllowed(amount: number): boolean {
        return amount == 0;
    }

    private isWalletBalanceInSufficientAmount(operationType: OperationType, walletBalance: number, normalisedAmount: number): boolean {
        const negativeAmount = normalisedAmount*-1;
        return operationType == OperationType.DEBIT && walletBalance < negativeAmount;
    }
}

export default UserServiceImpl;