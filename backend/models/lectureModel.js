import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.js';

const Lecture = sequelize.define('Lecture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lectureTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoUrl: {
    type: DataTypes.STRING,
  },
  isPreviewFree: {
    type: DataTypes.BOOLEAN,
  },
}, {
  timestamps: true,
});

export default Lecture;