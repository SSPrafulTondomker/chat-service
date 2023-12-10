class ReceivedMessages {
    public static readonly columnNames = {
        messageId: `message_id`,
        status: `status`,
        toUser: `to_user`,
        fromUser: `from_user`,
        createdAt: `created_at`,
        updatedAt: `updated_at`,
    };
    private _messageId: string;
    private _status: string;
    private _toUser: string;
    private _fromUser: string;
    private _createdAt: number;
    private _updatedAt: number;

    constructor(messageId: string, status: string, toUser: string, fromUser: string, createdAt: number, updatedAt: number) {
        this._messageId = messageId;
        this._status = status;
        this._toUser = toUser;
        this._fromUser = fromUser;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }


    get messageId(): string {
        return this._messageId;
    }

    get status(): string {
        return this._status;
    }

    get toUser(): string {
        return this._toUser;
    }

    get fromUser(): string {
        return this._fromUser;
    }

    get createdAt(): number {
        return this._createdAt;
    }

    get updatedAt(): number {
        return this._updatedAt;
    }
}

export default ReceivedMessages;


//
// CREATE TABLE received_messages (
//     message_id varchar(255) PRIMARY KEY,
//     status ENUM('READ', 'UNREAD'),
//     to_user varchar(255),
//     from_user varchar(255),
//     created_at bigint,
//     updated_at bigint
// );
