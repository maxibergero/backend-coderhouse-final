import { ticketModel } from "../models/tickets.models.js";
import { userModel } from "../models/users.models.js";

export const generarTicket = async (req, res) => {

    const generateUniqueCode = (purchase_datatime) => {

        //Genarando STRING 
        const year = purchase_datatime.getFullYear();
        const month = (purchase_datatime.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
        const day = purchase_datatime.getDate().toString().padStart(2, '0');
        const hour = purchase_datatime.getHours().toString().padStart(2, '0');
        const minutes = purchase_datatime.getMinutes().toString().padStart(2, '0');
        const seconds = purchase_datatime.getSeconds().toString().padStart(2, '0');
        const stringRes = `${year}${month}${day}${hour}${minutes}${seconds}`;

        req.logger.info(`Generando Codigo(generateUnicode): \n year: ${year} \n month: ${month} \n day: ${day} \n hour: ${hour} \n minutes: ${minutes} \n seconds: ${seconds}` )
        return stringRes
    }


    try {
        const idUser = req.user.user._id

        const user = await userModel.findById(idUser)

        const purcharser = user.email

        const arrayCart = user.cart.products
        
        const listProducts = []

        let total = 0;

        arrayCart.forEach(product => {
            total += product.quantity * product.id_prod.price
            listProducts.push(product.id_prod._id)
        });

        const amount = total

        const purchase_datatime = new Date();
        // Generar un código único, por ejemplo, usando un paquete como 'shortid'
        const uniqueCode = generateUniqueCode(purchase_datatime);

        // Asignar el código generado al campo 'code'
        const code = uniqueCode;

        req.logger.info(`Info del ticket: \n purcharser: ${purcharser} \n purchase_datatime: ${purchase_datatime} \n code: ${code} \n amount: ${amount}`)
        req.logger.debug(`User(generarTicket): ${user}`)
        
        if(arrayCart){
            let cont = 0;
            arrayCart.forEach(product => {
                cont += 1
                req.logger.debug(`Product(${cont}): ${product}`)
            });
        }

        const ticket = await ticketModel.create({ purcharser, purchase_datatime, code, amount, cart: user.cart, nombre: user.nombre, apellido: user.apellido })

        req.logger.debug(`Ticket generado(generarTicket): ${ticket}`)
        if (ticket) {
            res.status(200).send(ticket)
        } else {
            res.status(400).send("Error al crear ticket")
        }
    } catch (error) {
        req.logger.fatal(`Error al generar ticket: ${error}`)
        throw new Error(error)
    }


}


export const getTickets = async (req, res) => {
    try {
        const tickets = await ticketModel.find()
        if(tickets){
            res.status(200).send(tickets)
        }else{
            res.status(400).send("No hay tickets")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getTicketsById = async (req, res) => {
    try {
        const ticket = await ticketModel.findById(req.params.id)
        if(ticket){
            res.status(200).send(ticket)
        }else{
            res.status(400).send("No hay tickets")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}