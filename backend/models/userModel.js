import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  role: {
    type: DataTypes.ENUM('educator', 'student'),
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  enrolledCourses: {
    type: DataTypes.JSON, // or use association
  },
  resetOtp: {
    type: DataTypes.STRING,
  },
  otpExpires: {
    type: DataTypes.DATE,
  },
  isOtpVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

export default User;
