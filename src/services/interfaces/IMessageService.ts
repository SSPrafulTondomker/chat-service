import GetWalletRequest from "../../request/GetWalletRequest";
import SetUpWalletRequest from "../../request/SetUpWalletRequest";
import GetWalletResponse from "../../response/GetWalletResponse";
import SetUpWalletResponse from "../../response/SetUpWalletResponse";

export default interface IMessageService {
    setUpWallet(setUpWallet: SetUpWalletRequest): Promise<SetUpWalletResponse>;
    getWallet(getWalletRequest: GetWalletRequest): Promise<GetWalletResponse>;
}