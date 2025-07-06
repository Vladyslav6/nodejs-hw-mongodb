import { registerUser } from "../services/auth.js";

export const registerUserController = async (req, res)=>{
    const result = await registerUser(req.body);
};