import { sequelize } from '../utils/db';
import { DataTypes } from 'sequelize';

export const Message = sequelize.define(
  'Message',
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    username: {
      field: 'username',
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING,
      allowNull: false,
    },
    homepage: {
      field: 'homepage',
      type: DataTypes.STRING,
      defaultValue: null,
    },
    message: {
      field: 'message_text',
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'messages',
    updatedAt: false,
  },
);

// Good.belongsTo(Color, {
//   foreignKey: 'color_id',
//   constraints: false,
// });
