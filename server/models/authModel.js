import express from "express";
import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    key:{
        type: String,
        required: true,
    }
})

const authModel = mongoose.model("users", authSchema);

export default authModel