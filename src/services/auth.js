import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";

export const registerUser = async (payload) =>{
    const exsistUser = await UsersCollection.findOne({email: payload.email});
    if(exsistUser){
        throw createHttpError(409,'Email in use');
    }
 const user = await UsersCollection.create(payload);
 return user;
};