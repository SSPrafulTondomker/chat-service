import {Response} from "express"
class ErrorMapper {
    static mapResponseCode(error: any, res: Response) {
        if (error.isJoi) {
            return res.status(400).send({message: error.message, err: error});
        }
        if (error.statusCode) {
            return res.status(error.statusCode).send({message: error.message, err: error});
        }
        return res.status(500).send({message: error.message});
    }
}

export default ErrorMapper;