import nodemailer from "nodemailer";
import "dotenv/config"
export const enviarCorreoUserEliminado = async (req, res) => {
    const {email} = req.body
    
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'christian.telemercado@gmail.com',
              pass: process.env.PASSWORD_NODEMAILER
            }
          });

          const resultado = await transporter.sendMail({
            from: 'Importante!! <christian.telemercado@gmail.com>', 
            to: `${email}`, 
            subject: "User Eliminado ✔", 
            html: "<b>Tu usuario ha sido eliminado por inactividad</b>", 
    
        })
        res.status(200).send(resultado)
    } catch (error) {
        throw new Error(error)
    }
}