class SetUpWalletRequest {
    private _balance: number;
    private _name: string;

    constructor(balance: number, name: string) {
        this._balance = balance;
        this._name = name;
    }

    get balance(): number {
        return this._balance;
    }

    get name(): string {
        return this._name;
    }
}

export default SetUpWalletRequest;

/**
 * { balance: 10, name: ‘GroupMessage A’
}.
 */