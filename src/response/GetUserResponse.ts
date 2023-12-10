class GetUserResponse {
    private _id: string;
    private _walletId: string;
    private _amount: number;
    private _balance: number;
    private _date: number;
    private _description: string;
    private _type: OperationType

    constructor (id: string, walletId: string, amount: number, balance: number, 
        date: number, description: string, type: OperationType){
        this._id = id;
        this._walletId = walletId;
        this._amount = amount;
        this._balance = balance;
        this._date = date;
        this._description = description;
        this._type = type;
    }

    toJSON() {
        return {
            id: this._id,
            walletId: this._walletId,
            amount: this._amount ,
            balance: this._balance ,
            date: this._date,
            description: this._description ,
            type: this._type 
        }
    }
}

export default GetUserResponse;