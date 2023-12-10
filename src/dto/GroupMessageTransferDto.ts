import MessageTransferDto from "./MessageTransferDto";

class GroupMessageTransferDto extends MessageTransferDto{
    private _groupId: string;

    constructor(messageId: string, groupId: string, createdAt: number, updatedAt: number) {
        super(messageId, createdAt, updatedAt);
        this._groupId = groupId;
    }

    get groupId(): string {
        return this._groupId;
    }
}

export default GroupMessageTransferDto;

