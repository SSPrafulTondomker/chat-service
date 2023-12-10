class TransferBalanceRequest {
    private _amount: number;
    private _description: string;
    private _walletId: string;

    constructor(amount: number, description: string, walletId: string) {
        this._amount = amount;
        this._description = description;
        this._walletId = walletId;
    }

    get amount(): number {
        return this._amount;
    }

    get description(): string {
        return this._description;
    }

    get walletId(): string {
        return this._walletId;
    }
}

export default TransferBalanceRequest;