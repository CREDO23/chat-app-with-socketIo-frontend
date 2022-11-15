import type USER from "../../types/user";
import type UserItem from "../../types/props/userItem";

export const parseUser = (user : USER) : UserItem => {
    return {
        userName : user.userName ,
        imageProfile : user.avatar,
        online : user.isLogged ,
    }
}