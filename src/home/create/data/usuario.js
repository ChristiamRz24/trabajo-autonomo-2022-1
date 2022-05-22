const axios = require('axios').default;

const url = '/v1/sextob/api/usuario';

const crearUsuario = (data, tipox) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, {
                usuario: data.usuario,
                contrasena: data.contrasena,
                tipo: tipox
            })
            .then((response) => {
                resolve(response.data);
                console.log('¡Usuario creado!');
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = crearUsuario;
