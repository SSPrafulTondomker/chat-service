class GetTransactionRequest {
    private _skip: number;
    private _limit: number;
    private _walletId: string;


    constructor(skip: number, limit: number, walletId: string) {
        this._skip = skip;
        this._limit = limit;
        this._walletId = walletId;
    }

    get skip(): number {
        return this._skip;
    }

    get limit(): number {
        return this._limit;
    }

    get walletId(): string {
        return this._walletId;
    }
}

export default GetTransactionRequest;

/***
 * 
 * {walletId, skip, limit}
 */