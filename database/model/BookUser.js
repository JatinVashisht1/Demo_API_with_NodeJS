import mongoose, { model, Schema } from "mongoose";

const PasswordType = new Schema({
    salt: {
        type: String,
    },
    hash: {
        type: String,
    }
})

const bookUser = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: PasswordType,
        required: true,
    },

    apiKeys: {
        type: [String],
        select: false,
    }
})

export const UserModel = model("BookUser", bookUser);
