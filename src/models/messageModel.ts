// import { sequelize } from '../utils/db';
// import { DataTypes } from 'sequelize';

// const Message = sequelize.define(
//   'Message',
//   {
//     id: {
//       field: 'id',
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     name: {
//       field: 'name',
//       type: DataTypes.STRING,
//     },
//     colorId: {
//       field: 'color_id',
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'goods',
//   },
// );

// Good.belongsTo(Color, {
//   foreignKey: 'color_id',
//   constraints: false,
// });
