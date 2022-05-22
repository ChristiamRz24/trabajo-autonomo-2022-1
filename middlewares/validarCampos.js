const {validationResult} = require('express-validator');
// Validar que los campos esten o no vacios
const validarCampos = (req, res, next)=>{
    const errors = validationResult(req);
    // Si estan vacios
    if (errors.isEmpty())
    {
        // Retornar el error 
        return res.status(400).json(errors)
    }
    next()
}
// Exportar funcion validarCampos
module.exports = {
    validarCampos
}