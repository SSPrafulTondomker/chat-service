class WalletBalanceError extends Error{
    private _statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this._statusCode = statusCode;
    }

    get statusCode (): number {
        return this._statusCode
    }

    toJSON() {
        return {
            statusCode: this._statusCode
        }
    }
}

export default WalletBalanceError;