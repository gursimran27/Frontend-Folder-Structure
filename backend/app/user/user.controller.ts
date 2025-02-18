
import { type Request, type Response } from 'express';
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
import { createUserTokens } from '../common/services/passport-jwt.service';
import * as userService from "./user.service";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    const { password, ...user } = result;
    res.send(createResponse(user, "User created sucssefully"))
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.editUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.deleteUser(req.params.id);
    res.send(createResponse(result, "User deleted sucssefully"))
});


export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.id);
    res.send(createResponse(result))
});


export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.send(createResponse(result))
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const tokens = createUserTokens(req.user!)
    res.send(createResponse(tokens))
});


export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.user?._id!)
    res.send(createResponse(user))
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    // To do: Remove session
    res.send(createResponse({}))
});