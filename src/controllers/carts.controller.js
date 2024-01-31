import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import {userModel} from "../models/users.models.js"

export const getCartById = async (req, res) => {

    const { id } = req.params


    try {
        const cart = await cartModel.findById(id)

        req.logger.debug(`Carrito consultado getCartByid: ${cart}`)
        if (cart)
            res.status(200).send({ respuesta: 'OK', mensaje: cart })
        else
            res.status(404).send({ respuesta: 'Error en consultar Carrito', mensaje: 'Not Found' })
    } catch (error) {
        req.logger.fatal(`Error en consulta carrito: ${error}`)
        res.status(400).send({ respuesta: 'Error en consulta carrito', mensaje: error })
    }
}




export const postCart = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    req.logger.info(`Carrito creado: \n Cid: ` + cid + ` \n Pid: ` + pid + ` \n Quantity: ` + quantity)

    try {
        const cart = await cartModel.findById(cid)
        req.logger.debug(`Carrito buscado (postCart): ${cart}`)
        if (cart) {
            const prod = await productModel.findById(pid) //Busco si existe en LA BDD, no en el carrito
            req.logger.debug(`Producto buscado (postCart): ${prod}`)
            if (prod) {
                const indice = cart.products.findIndex(item => item.id_prod._id.toHexString() == pid) //Busco si existe en el carrito
                if (indice != -1) {
                    cart.products[indice].quantity = quantity //Si existe en el carrito modifico la cantidad

                    if (quantity == 0) {
                        // Si la cantidad es cero, eliminamos el producto del array
                        cart.products.splice(indice, 1);
                    }
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity }) //Si no existe, lo agrego al carrito

                    
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart) //Actualizar el carrito
                

                req.logger.debug(`Carrito actualizado (postCart): ${respuesta}`)
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Produt Not Found' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Cart Not Found' })
        }

    } catch (error) {
        req.logger.fatal(`Error en agregar carrito: ${error}`)
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error })
    }
}



export const deleteProductCart = async (req, res) => {
    try {
        const { idCart, idProduct } = req.params;

        const cart = await cartModel.findById(idCart);

        if (!cart) {
            throw new Error("Cart no existe");
        }

       

        // Filtrar los productos para eliminar el producto con el id dado
        const updatedProducts = cart.products.filter(product => product.id_prod._id != idProduct);

        if(updatedProducts.length == cart.products.length) {
            throw new Error("El producto no existe en el carrito");
        }

        // Actualizar el array de productos del carrito
        cart.products = updatedProducts;

        // Guardar los cambios en la base de datos
        await cart.save();

        // Responder con el carrito actualizado
        res.status(200).send(cart);

    } catch (error) {
        
        res.status(500).send(error.message);
    }
};


export const limpiarMyCart = async (req, res) => {

    try {
        const idUser = req.user.user._id
        const user = await userModel.findById(idUser)

        if (user) {
            user.cart.products = []
            await user.cart.save()
            res.status(200).send(user)
        }else{
            res.status(400).send("Usuario no encontrado")
        }

        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

