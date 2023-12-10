import mysql from "mysql2/promise";

const walletServiceDatabase : mysql.Pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "chat_service"
});

export default {walletServiceDatabase};