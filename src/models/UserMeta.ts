class UserMeta {
    public static readonly columnNames = {
        userId: `user_id`,
        userName: `user_name`,
        password: `password`,
        createdAt: `created_at`,
        updatedAt: `updated_at`
    };
    private _userId: string;
    private _userName: string;
    private _password: string;
    private _createdAt: number;
    private _updatedAt: number;

    constructor(userId: string, userName: string, password: string, createdAt: number, updatedAt: number) {
        this._userId = userId;
        this._userName = userName;
        this._password = password;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }


    get userId(): string {
        return this._userId;
    }

    get userName(): string {
        return this._userName;
    }

    get password(): string {
        return this._password;
    }
    get createdAt(): number {
        return this._createdAt;
    }

    get updatedAt(): number {
        return this._updatedAt;
    }
}

export default UserMeta;


//
// CREATE TABLE userMeta (
//     user_id varchar(255) PRIMARY KEY,
//     user_name varchar(255),
//     password char(255),
//     created_at bigint,
//     updated_at bigint
// );
