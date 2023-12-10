class GroupMessage {
    public static readonly columnNames = {
        groupId: `group_id`,
        messageId: `message_id`,
        createdAt: `created_at`,
        updatedAt: `updated_at`
    };


    private _groupId: string;
    private _messageId: string;
    private _createdAt: number;
    private _updatedAt: number;

    constructor(groupId: string, messageId: string, createdAt: number, updatedAt: number) {
        this._groupId = groupId;
        this._messageId = messageId;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    get groupId(): string {
        return this._groupId;
    }

    get messageId(): string {
        return this._messageId;
    }

    get createdAt(): number {
        return this._createdAt;
    }

    get updatedAt(): number {
        return this._updatedAt;
    }
}

export default GroupMessage;

//
// CREATE TABLE group_message (
//     group_id varchar(255),
//     message_id varchar(255),
//     created_at int,
//     created_at int
// );
// ALTER TABLE wallet ADD PRIMARY KEY (group_id)