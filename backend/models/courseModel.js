import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.js';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subTitle: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  thumbnail: {
    type: DataTypes.STRING,
  },
  enrolledStudents: {
    type: DataTypes.JSON,
  },
  lectures: {
    type: DataTypes.JSON,
  },
  creator: {
    type: DataTypes.INTEGER,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  reviews: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

export default Course