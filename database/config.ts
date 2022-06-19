import { connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const dbConnection = async () => {
    try {
        await connect(process.env["MONGODB_CNN"] || "")
        console.log(`Base de datos ejecutandose sin problemas`);
    } catch(error) {
        throw new Error(`Base de datos no disponible`);
        console.log(error);
    }
}

export { dbConnection }
