import {Router} from "express"
import {enviarCorreoUserEliminado} from "../controllers/envioCorreo.controller.js"
import { passportError, authorization } from "../utils/messagesError.js";

const envioCorreoRouter = Router()


envioCorreoRouter.post('/userEliminado', passportError("jwt"), authorization(["Admin", "User"]), enviarCorreoUserEliminado)

export default envioCorreoRouter