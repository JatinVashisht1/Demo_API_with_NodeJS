import { Router } from "express";
import * as jwtUtils from "../util/utils.cjs";
import createHttpError from "http-errors";

const bookRouter = Router();

bookRouter.get('/:apiKey', jwtUtils.middleware, async (req, res, next) => {
    const apikey = req.params.apiKey;
    console.log(`param is ${req.params.apiKey}`);
    const isValid = jwtUtils.verfyApiKey(apikey);
    if (isValid) {
        return res.status(200).json({ success: true })
    } else {
        next(createHttpError(401, "You are not authorized."));
    }
});

export default bookRouter;
