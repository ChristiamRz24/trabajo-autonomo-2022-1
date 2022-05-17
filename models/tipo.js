const { Schema, model } = require('mongoose')

const tipoSchema = Schema(
    {  
        nombre: String
    }
)

module.exports = model('Tipo', tipoSchema);

