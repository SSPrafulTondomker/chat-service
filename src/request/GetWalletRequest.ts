class GetWalletRequest {
    private _walletId: string;

    constructor(walletId: string) {
        this._walletId = walletId;
    }

    get walletId(): string {
        return this._walletId;
    }
}

export default GetWalletRequest;