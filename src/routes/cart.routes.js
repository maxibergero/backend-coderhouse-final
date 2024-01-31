import { Router } from "express";
import { cartModel } from "../models/carts.models.js";
import { getCartById, postCart, deleteProductCart, limpiarMyCart } from "../controllers/carts.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";



const cartRouter = Router()


cartRouter.get('/:id', passportError("jwt"), authorization("Admin"), getCartById)

cartRouter.post('/', async (req, res) => {

    try {
        const cart = await cartModel.create({})
        res.status(200).send({ respuesta: 'OK', mensaje: cart })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear Carrito', mensaje: error })
    }
})

cartRouter.post('/:cid/products/:pid', passportError("jwt"), authorization(["Admin", "User"]), postCart)

cartRouter.delete('/:idCart/products/:idProduct', passportError("jwt"), authorization(["Admin", "User"]), deleteProductCart)

cartRouter.put('/limpiarMyCart', passportError("jwt"), authorization(["Admin", "User"]), limpiarMyCart)

export default cartRouter