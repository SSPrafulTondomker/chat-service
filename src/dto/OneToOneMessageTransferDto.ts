import MessageTransferDto from "./MessageTransferDto";

class OneToOneMessageTransferDto extends MessageTransferDto{
    private _status: string;
    private _toUser: string;
    private _fromUser: string;

    constructor(messageId: string, status: string, toUser: string, fromUser: string, createdAt: number, updatedAt: number) {
        super(messageId, createdAt, updatedAt)
        this._status = status;
        this._toUser = toUser;
        this._fromUser = fromUser;
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
}

export default OneToOneMessageTransferDto;

