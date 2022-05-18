const { connect } = require('mongoose');

const dbConnection = async ()=>{
    try{
        await connect(process.env.MONGODB_CNN)
        console.log('Base de datos ejecutandose sin problema');
    } catch(error) {
        console.log('Error de coneccion a la base de datos');
        console.log(error.message);
    }
}

module.exports = { dbConnection }
