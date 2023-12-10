class SetUpWalletResponse {
    private _id: string;
    private _transactionId: string;
    private _name: string;
    private _balance: number;
    private _date: number;

    constructor (id: string, transactionId: string, name: string, balance: number, date: number){
        this._balance = balance;
        this._date = date;
        this._id = id;
        this._name = name;
        this._transactionId = transactionId;
    }

    toJSON() {
        return {
            balance: this._balance,
            date: this._date,
            id: this._id,
            name: this._name,
            transactionId: this._transactionId
        }
    }
}

export default SetUpWalletResponse;

/***
 * 
 * { id, balance,
transactionId:
‘4349349843’, name:
‘Hello world’,

date: <JS Date obj>}
 */