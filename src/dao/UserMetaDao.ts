import mysql from "mysql2/promise";
import MessageDto from "../dto/MessageDto";
import MessageTransferDto from "../dto/MessageTransferDto";


class UserMetaDao {
    private messageServiceDatabase: mysql.Pool;
    constructor(mysqlPool: any) {
        this.messageServiceDatabase = mysqlPool.messageServiceDatabase;
    }

    async transferWalletBalance(messageDto: MessageDto, messageTransferDto: MessageTransferDto): Promise<void> {

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
}

export default UserMetaDao;