const axios = require('axios').default;

const url = '/v1/sextob/api/usuario';

const consultarUsuario = (data) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${url}/${data.id}`)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

module.exports = consultarUsuario;
