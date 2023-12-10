import IMessageService from "./interfaces/IMessageService";
import MessageDao from "../dao/MessageDao";
import GetWalletRequest from "../request/GetWalletRequest";
import SetUpWalletRequest from "../request/SetUpWalletRequest";
import GetWalletResponse from "../response/GetWalletResponse";
import GroupMessage from "../models/GroupMessage";
import SetUpWalletResponse from "../response/SetUpWalletResponse";
import MessageDto from "../dto/MessageDto";
import {v4 as uuidv4} from "uuid";
import UserMetaDao from "../dao/UserMetaDao";
import MessageTransferDto from "../dto/MessageTransferDto";
import {OperationType} from "../enumerations/OperationType";
import WalletConstants from "../constants/WalletConstants";
import WalletBalanceError from "../errors/WalletBalanceError";

class MessageServiceImpl implements IMessageService {
    walletDao: MessageDao;
    transactionDao: UserMetaDao;

    constructor(walletDao: MessageDao, transactionDao: UserMetaDao) {
        this.walletDao = walletDao;
        this.transactionDao = transactionDao;
    }

    async setUpWallet(setUpWallet: SetUpWalletRequest): Promise<SetUpWalletResponse> {

        const normalisedWalletBalance: number = setUpWallet.balance * WalletConstants.DECIMAL_CONSTANT;
        const timeStamp: number = Date.now();

        const walletDto: MessageDto = new MessageDto(
            uuidv4(),
            setUpWallet.name,
            normalisedWalletBalance,
            timeStamp,
            timeStamp
        );

        const transactionDto: MessageTransferDto = new MessageTransferDto(uuidv4(), normalisedWalletBalance, normalisedWalletBalance);

        await this.walletDao.insertOneToOneMessage(walletDto, transactionDto);
        return new SetUpWalletResponse(
            walletDto.walletId,
            transactionDto.transactionId,
            walletDto.walletName,
            walletDto.balance,
            walletDto.createdAt
        );
    }

    async getWallet(getWalletRequest: GetWalletRequest): Promise<GetWalletResponse> {
        const wallet: GroupMessage | null = await this.walletDao.getReceivedMessagesByUserName(getWalletRequest.walletId);
        if (wallet == null) {
            throw new WalletBalanceError("wallet not found", 400);
        }
        return new GetWalletResponse(
            wallet.walletId,
            wallet.messageId / WalletConstants.DECIMAL_CONSTANT,
            wallet.groupId,
            wallet.updatedAt
        );
    }
}

export default MessageServiceImpl;