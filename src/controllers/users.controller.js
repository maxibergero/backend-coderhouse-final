import { userModel } from "../models/users.models.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        if(users){
            let cont = 0
            users.forEach(user => {
                cont += 1
                
            });
        }
        res.status(200).send({ respuesta: 'OK', mensaje: users })
    } catch (error) {
        
        res.status(400).send({ respuesta: 'Error en consultar usuarios', mensaje: error })
    }
}


export const getMyUser = async (req, res) => {
    try {
        const idUser = req.user.user._id

        const user = await userModel.findById(idUser)
        console.log(user)
        res.status(200).send(user)
    } catch (error) {
        throw new Error(error)
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(id)
        if (user) {
           
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en consultar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
 
        res.status(400).send({ respuesta: 'Error en consultar usuario', mensaje: error })
    }
}

export const putUserById = async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, edad, email, password } = req.body
  
    try {
        const user = await userModel.findByIdAndUpdate(id, { nombre, apellido, edad, email, password })
        if (user) {
          
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en actualizar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
      
        res.status(400).send({ respuesta: 'Error en actualizar usuario', mensaje: error })
    }
}

export const deleteUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findByIdAndDelete(id)
        if (user) {
          
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en eliminar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
     
        res.status(500).send({ respuesta: 'Error en eliminar usuario', mensaje: error })
    }
}


export const deleteUsersPorUltimaSesion = async (req, res) => {
    try {
        const users = await userModel.find();

        let usersEliminados = []

        if (users.length > 0) {
            for (const user of users) {
                // Verificar si la última sesión supera 48 hs en comparación con el momento actual 172800000
                if (user.ultimaConexion < Date.now() - 172800000) {
                    console.log(user);
                    let userEliminado = await userModel.findByIdAndDelete(user._id);
                    usersEliminados.push(userEliminado);
                }
            }

            if(usersEliminados.length > 0){
                res.status(200).send(usersEliminados);
            }else{
                res.status(400).send({mensaje: 'No hay usuarios en condiciones para eliminar'});
            }
        } else {
            res.status(400).send({mensaje: 'No Existe lista de usuarios'});
        }
    } catch (error) {
        
        res.status(500).send(error);
    }
};
