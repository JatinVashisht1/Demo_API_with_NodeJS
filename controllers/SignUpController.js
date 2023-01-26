import * as jwtUtils from "../util/utils.cjs";
import { UserModel } from "../database/model/BookUser.js";
import createHttpError from "http-errors";

export const SignUpController = async (req, res, next) => {
    const username = req.body.username;
    const passwordRaw = req.body.password;

    console.log(`username is ${username}, password is ${passwordRaw}`);

    if (!username || !passwordRaw) {
        next(createHttpError(400, "Credentials missing."));
    }
    
    try {
        const user = await UserModel.findOne({username: username}).exec();
        
        if (user) {
            next(createHttpError(409, "User already exist."));
        }
        
        // user don't exist
        const passwordHashsed = jwtUtils.genPassword(passwordRaw);
        const userDoc = await UserModel.create({username: username, password: passwordHashsed});
        const apiKey = jwtUtils.issueApiKey(userDoc).token;
        
        const updatedUser = {
            username: userDoc.username,
            password: userDoc.password,
            apiKeys: userDoc.apiKeys,
        };
        console.log(`updated user is ${JSON.stringify(updatedUser)}`);


      
          if (!updatedUser.apiKeys) {
            updatedUser.apiKeys = [apiKey];
          } else {
            updatedUser.apiKeys.push(apiKey);
          }

        const userAfterAddingKey = await UserModel.findOne({username: username})
        .update(updatedUser)
        .exec();
        
          return res.status(200).json({success: true, message: apiKey});

    } catch (error) {
        next (error);  
    }

}