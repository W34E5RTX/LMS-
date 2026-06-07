import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.POSTGRES_URL;
if (!dbUrl) {
  throw new Error("Missing POSTGRES_URL environment variable.");
}

const sequelize = new Sequelize(dbUrl, {
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
    console.log("DB connected");
  } catch (error) {
    console.error("DB error:", error);
    throw error;
  }
};

export default connectDb;
export { sequelize };