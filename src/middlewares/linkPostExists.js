// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

const linkExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el id de la entrada de los path params.
        const { linkId } = req.params;

        const [links] = await connection.query(
            `SELECT id FROM entries WHERE id = ?`,
            [linkId]
        );

        // Lanzamos un error si la entrada no existe.
        if (links.length < 1) {
            notFoundError('entrada');
        }

        // Pasamos el control a la siguiente función controladora.
        next();

    } catch (err) {
        next(err);

    } finally {
        if (connection) connection.release();
    }
};

module.exports = linkExists;