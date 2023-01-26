import { Router } from "express";
import { SignUpController } from "../controllers/SignUpController.js";
import { UserModel } from "../database/model/BookUser.js";

const userRouter = Router();

userRouter.post('/signup', SignUpController);

userRouter.delete("/signup", async (req, res, next) => {
    const result = await UserModel.deleteMany({}).exec();

    return res.status(200).json(result);
})

export default userRouter;