class TransferBalance {
    private _transactionId: string;
    private _balance: number;

    constructor (transactionId: string, balance: number){
        this._balance = balance;
        this._transactionId = transactionId;
    }

    toJSON() {
        return {
            balance: this._balance,
            transactionId: this._transactionId
        }
    }
}

export default TransferBalance;


/**
 * { balance: 30,
transactionId:
‘8328832323’ }
 * 
*/