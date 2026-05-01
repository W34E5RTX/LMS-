import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  student: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  razorpay_order_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razorpay_payment_id: {
    type: DataTypes.STRING,
  },
  razorpay_signature: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'INR',
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paidAt: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
});

export default Order;
