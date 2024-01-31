import { Router } from "express";
import { getUsers, getUserById, putUserById, deleteUserById, getMyUser, deleteUsersPorUltimaSesion } from "../controllers/users.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";

const userRouter = Router()

userRouter.get('/myUser', passportError("jwt"), getMyUser)

userRouter.get('/', passportError("jwt"), authorization(["Admin"]), getUsers)

userRouter.get('/:id', passportError("jwt"), authorization(["Admin"]), getUserById)

userRouter.put('/:id', passportError("jwt"), authorization(["Admin"]), putUserById)

userRouter.delete('/:id', passportError("jwt"), authorization(["Admin"]), deleteUserById)

userRouter.delete('/', passportError("jwt"), authorization(["Admin"]), deleteUsersPorUltimaSesion)



export default userRouter
