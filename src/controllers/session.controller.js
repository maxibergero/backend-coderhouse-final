import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {
    const token = generateToken(req.user)
    
    res.status(200).send({ token })

}

export const register = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(400).send({ mensaje: "Usuario ya existente" })
        }

        req.logger.debug(`Usuario registrado: ${req.user}`)
        res.status(200).send({ mensaje: 'Usuario registrado' })
    } catch (error) {
        req.logger.fatal(`Error al registrar usuario: ${error}`)
        res.status(500).send({ mensaje: `Error al registrar usuario ${error}` })
    }
}

export const logout = async (req, res) => {
    /*Si manejo sesiones en BDD*
    if (req.session.login) {
        req.session.destroy()
    }*/
    res.clearCookie('jwtCookie')
    res.status(200).send({ resultado: 'Usuario deslogueado' })
}