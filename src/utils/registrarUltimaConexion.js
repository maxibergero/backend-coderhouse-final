import {userModel} from '../../src/models/users.models.js'

export const registrarUltimaConexion = async (req, res, next) => {
    
    try {
       
        await userModel.findByIdAndUpdate(req.user._id, {ultimaConexion: Date.now()})
        next()
    } catch (error) {
        throw new Error(error.message)
    }
}