import {get} from "lodash";
import mysql from "mysql2/promise";
import ReceivedMessages from "../models/ReceivedMessages";
import MessageDto from "../dto/MessageDto";
import GroupMessageTransferDto from "../dto/GroupMessageTransferDto";
import OneToOneMessageTransferDto from "../dto/OneToOneMessageTransferDto";

class MessageDao {
    private messageServiceDatabase: mysql.Pool;
    constructor(mysqlPool: any) {
        this.messageServiceDatabase = mysqlPool.messageServiceDatabase;
    }


    async insertGroupMessage(messageDto: MessageDto, groupMessageTransferDto: GroupMessageTransferDto): Promise<void> {

        const connection: mysql.PoolConnection = await this.messageServiceDatabase.getConnection();
        await connection.beginTransaction();

        try {
            let query: string = `INSERT INTO messages(message_id, text, created_by, created_at, updated_at) values ?`;
            let rows: any = []
            rows.push([messageDto.messageId, messageDto.text, messageDto.createdBy, messageDto.createdAt, messageDto.updatedAt])
            await connection.query(query, [rows])

            let transferQuery: string = `INSERT INTO group_messages (message_id, group_id, created_at, updated_at) values ?`;
            let transferRows: any = []
            transferRows.push([groupMessageTransferDto.messageId, groupMessageTransferDto.groupId, groupMessageTransferDto.createdAt, groupMessageTransferDto.updatedAt])
            await connection.query(transferQuery, [transferRows])

            await connection.commit();
            return Promise.resolve();
        } catch (err: any) {
            await connection.rollback();
            return Promise.reject(err);
        } finally {
            await connection.release();
        }
    }

    async insertOneToOneMessage(messageDto: MessageDto, messageTransferDto: OneToOneMessageTransferDto): Promise<void> {
        const connection: mysql.PoolConnection = await this.messageServiceDatabase.getConnection();
        await connection.beginTransaction();

        try {
            let query: string = `INSERT INTO messages(message_id, text, created_by, created_at, updated_at) values ?`;
            let rows: any = []
            rows.push([messageDto.messageId, messageDto.text, messageDto.createdBy, messageDto.createdAt, messageDto.updatedAt])
            await connection.query(query, [rows])

            let transferQuery: string = `INSERT INTO received_messages (message_id, status, to_user, created_at, updated_at) values ?`;
            let transferRows: any = []
            transferRows.push([messageTransferDto.messageId, messageTransferDto.status, messageTransferDto.toUser, messageTransferDto.createdAt, messageTransferDto.updatedAt])
            await connection.query(transferQuery, [transferRows])

            await connection.commit();
            return Promise.resolve();
        } catch (err: any) {
            await connection.rollback();
            return Promise.reject(err);
        } finally {
            await connection.release();
        }
    }

    async getReceivedMessagesByUserId(userId: string): Promise<ReceivedMessages | null> {
        const query = `SELECT * FROM received_messages WHERE to_userId = ?`;
        try {
            let result: ReceivedMessages | null = null;
            const [rows, _] = await this.messageServiceDatabase.query(query, [userId]) as any;
            for(let row of rows){
                result = new ReceivedMessages(
                    get(row, ReceivedMessages.columnNames.messageId),
                    get(row, ReceivedMessages.columnNames.status),
                    get(row, ReceivedMessages.columnNames.toUser),
                    get(row, ReceivedMessages.columnNames.fromUser),
                    get(row, ReceivedMessages.columnNames.createdAt),
                    get(row, ReceivedMessages.columnNames.updatedAt),
                )
                break;
            }
            return Promise.resolve(result);
        } catch (err: any) {
            return Promise.reject(err);
        }
    }

    async getHistoryMessagesBySelfUserIdAndOpponentUserId(userId: string, opponentUserId: string): Promise<ReceivedMessages | null> {
        const query = `SELECT * FROM received_messages WHERE to_userId = ? and from_userId = ?`;
        try {
            let result: ReceivedMessages | null = null;
            const [rows, _] = await this.messageServiceDatabase.query(query, [opponentUserId, userId]) as any;
            for(let row of rows){
                result = new ReceivedMessages(
                    get(row, ReceivedMessages.columnNames.messageId),
                    get(row, ReceivedMessages.columnNames.status),
                    get(row, ReceivedMessages.columnNames.toUser),
                    get(row, ReceivedMessages.columnNames.fromUser),
                    get(row, ReceivedMessages.columnNames.createdAt),
                    get(row, ReceivedMessages.columnNames.updatedAt),
                )
                break;
            }
            return Promise.resolve(result);
        } catch (err: any) {
            return Promise.reject(err);
        }
    }
}

export default MessageDao;

