const { Contratista } = require('../../../models/index');

// Consultar los datos de un contratista por su id de usuario
const obtenerContratista = (idUsuariox) => {
    return new Promise((resolve, reject) => {
        Contratista
            // Buscar un contratista que su 'idUsuario' sea igual al id pasado a la función
            .find({idUsuario:idUsuariox})
            .then((response) => {
                // Se retorna el contratista encontrado
                resolve(response);
            })
            .catch((error) => {
                // Se retorna el error
                reject(error);
            })
    })
}

module.exports = obtenerContratista;
