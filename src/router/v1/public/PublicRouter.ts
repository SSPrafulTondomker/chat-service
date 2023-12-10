import {Router} from "express";
import {AwilixContainer} from "awilix";
import CreateUserControllerPublic from "../../../controller/GetUsersControllerPublic";
import UserLoginControllerPublic from "../../../controller/CreateUserControllerPublic";
import GetUsersControllerPublic from "../../../controller/UserLogoutControllerPublic";
import GetUnReadMessagesControllerPublic from "../../../controller/UserLoginControllerPublic";

function PublicRouter(container: AwilixContainer) {
    const router = Router();

    router.post('/user', async (req, res) => {
        await container.resolve<CreateUserControllerPublic>('createUserControllerPublic').handleRequest(req, res);
    });

    router.post('/login', async (req, res) => {
        await container.resolve<UserLoginControllerPublic>('userLoginControllerPublic').handleRequest(req, res);
    });

    router.post('/logout', async (req, res) => {
        await container.resolve<UserLogoutControllerPublic>('userLogoutControllerPublic').handleRequest(req, res);
    });

    router.get('/user', async (req, res) => {
        await container.resolve<GetUsersControllerPublic>('getUsersControllerPublic').handleRequest(req, res);
    });

    router.get('/user/:username/message', async (req, res) => {
        await container.resolve<GetUnReadMessagesControllerPublic>('getUnReadMessagesControllerPublic').handleRequest(req, res);
    });

    router.post('/user/:username/message', async (req, res) => {
        await container.resolve<SendMessagesControllerPublic>('sendMessagesControllerPublic').handleRequest(req, res);
    });

    router.post('/send/text/group', async (req, res) => {
        await container.resolve<SendTextToGroupControllerPublic>('sendTextToGroupControllerPublic').handleRequest(req, res);
    });

    return router
}

export default PublicRouter;