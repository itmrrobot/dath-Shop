const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('shop', 'postgres', '123456', {
//     host: 'localhost',
//     dialect: 'postgres',
//     port: 5432
//   });
//postgres://postgres.rdksessmjmikphzsryre:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
const sequelize = new Sequelize('postgres://postgres.rdksessmjmikphzsryre:1Legoonepiece@@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres');
const connection =async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connection;