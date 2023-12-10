class Message {
    public static readonly columnNames = {
        messageId: `message_id`,
        text: `text`,
        createdBy: `created_by`,
        createdAt: `created_at`,
        updatedAt: `updated_at`
    };
    private _messageId: string;
    private _text: string;
    private _createdBy: string;
    private _createdAt: number;
    private _updatedAt: number;

    constructor(messageId: string, text: string, createdBy: string, createdAt: number, updatedAt: number) {
        this._messageId = messageId;
        this._text = text;
        this._createdBy = createdBy;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }


    get messageId(): string {
        return this._messageId;
    }

    get text(): string {
        return this._text;
    }

    get createdBy(): string {
        return this._createdBy;
    }

    get createdAt(): number {
        return this._createdAt;
    }

    get updatedAt(): number {
        return this._updatedAt;
    }
}

export default Message;


//
// CREATE TABLE messages (
//     message_id varchar(255) PRIMARY KEY,
//     text varchar(255),
//     created_by char(255),
//     created_at bigint,
//     updated_at bigint
// );
