
module.exports = {
  client: 'mysql',
  connection: process.env.LOCALBASE_URL || 'mysql://root:pretinha@127.0.0.1:3306/cashback'
};