import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB connected")
    } catch (error) {
        console.log("DB error:", error.message)
    }
}

export default connectDb;
export { sequelize };