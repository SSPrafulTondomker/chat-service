class MessageTransferDto {
    private _messageId: string;
    private _createdAt: number;
    private _updatedAt: number;

    constructor(messageId: string, createdAt: number, updatedAt: number) {
        this._messageId = messageId;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
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

export default MessageTransferDto;

