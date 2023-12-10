class WalletResponse {
    private _id: string;
    private _balance: number;
    private _name: string;
    private _date: number;

    constructor (id: string, balance: number, name: string, date: number){
        this._balance = balance;
        this._id = id;
        this._name = name;
        this._date = date;
    }

    toJSON() {
        return {
            balance: this._balance,
            id: this._id,
            name: this._name,
            date: this._date
        }
    }
}

export default WalletResponse;


/**
 * {
id,
balan
ce,
name
, date

}
 * 
*/