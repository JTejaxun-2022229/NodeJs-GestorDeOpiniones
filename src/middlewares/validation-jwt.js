import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

// Middleware para validar un token JWT en una petición
export const validationJWT = async (req, res, next) => {
    // Obtener el token de la cabecera de la petición
    const token = req.header("x-token");

    // Verificar si no hay token en la petición y devolver un error
    if (!token) {
        return res.status(401).json({
            msg: "There is no token in the request",
        });
    }

    try {
        // Verificación del token
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);

        // Leer el usuario correspondiente al UID
        const user = await User.findById(uid);

        // Verificar que el usuario exista
        if (!user) {
            return res.status(401).json({
                msg: 'User do not exist in database'
            });
        }

        // Verificar si el usuario está habilitado
        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token - user with status:false'
            });
        }

        // Agregar el usuario al objeto de solicitud (req) para su uso posterior
        req.user = user;

        // Llamar a la siguiente función en la cadena de middlewares
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Invalid token ",
        });
    }
}