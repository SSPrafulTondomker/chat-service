import {asClass, asValue, createContainer, Lifetime} from "awilix";


import CreateUserControllerPublic from "../controller/CreateUserControllerPublic";
import GetUsersControllerPublic from "../controller/GetUsersControllerPublic";

import mysqlPool from "../driver/mysql";
import MessageServiceImpl from "../services/MessageServiceImpl";
import UserServiceImpl from "../services/UserServiceImpl";
import UserMetaDao from "../dao/UserMetaDao";
import MessageDao from "../dao/MessageDao";
import IUserService from "../services/interfaces/IUserService";
import IMessageService from "../services/interfaces/IMessageService";
import UserLogoutControllerPublic from "../controller/UserLogoutControllerPublic";
import UserLoginControllerPublic from "../controller/UserLoginControllerPublic";
import GetUnReadMessagesControllerPublic from "../controller/GetUnReadMessagesControllerPublic";
import SendMessagesControllerPublic from "../controller/SendMessagesControllerPublic";
import SendTextToGroupControllerPublic from "../controller/SendTextToGroupControllerPublic";

interface ICradle {
    mysqlPool: any,
    createUserControllerPublic: CreateUserControllerPublic,
    userLoginControllerPublic: UserLoginControllerPublic,
    userLogoutControllerPublic: UserLogoutControllerPublic,
    getUsersControllerPublic: GetUsersControllerPublic,
    getUnReadMessagesControllerPublic: GetUnReadMessagesControllerPublic,
    sendMessagesControllerPublic: SendMessagesControllerPublic,
    sendTextToGroupControllerPublic: SendTextToGroupControllerPublic,
    userServiceImpl: IUserService,
    messageServiceImpl: IMessageService,
    groupMessageDao: UserMetaDao,
    messageDao: MessageDao
}

const container = createContainer<ICradle>({injectionMode: "CLASSIC"});

container.register({
    mysqlPool: asValue(mysqlPool),
})

container.register({
    createUserControllerPublic: asClass(CreateUserControllerPublic, getScope()),
    userLoginControllerPublic: asClass(UserLoginControllerPublic, getScope()),
    userLogoutControllerPublic: asClass(UserLogoutControllerPublic, getScope()),
    getUsersControllerPublic: asClass(GetUsersControllerPublic, getScope()),
    getUnReadMessagesControllerPublic: asClass(GetUnReadMessagesControllerPublic, getScope()),
    sendMessagesControllerPublic: asClass(SendMessagesControllerPublic, getScope()),
    sendTextToGroupControllerPublic: asClass(SendTextToGroupControllerPublic, getScope()),
})

container.register({
    messageServiceImpl: asClass(MessageServiceImpl, getScope()),
    userServiceImpl: asClass(UserServiceImpl, getScope())
})

container.register({
    groupMessageDao: asClass(UserMetaDao, getScope()),
    messageDao: asClass(MessageDao, getScope())
})

function getScope() {
    return {lifetime: Lifetime.SINGLETON};
}
export {container};