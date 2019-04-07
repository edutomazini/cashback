
module.exports = {
  client: 'mysql',
  //connection: process.env.LOCALBASE_URL || 'mysql://root:pretinha@127.0.0.1:3306/cashback',
  connection: process.env.LOCALBASE_URL || 'mysql://dwyzeebkjglicvc9:oa09o2f2zsj63261@e764qqay0xlsc4cz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/c3zm360vj5ueuzvx',
  pool: {
    afterCreate: function (conn, callback) {
      conn.query('set @@session.time_zone = "-06:00";', function (err) {
        callback(err, conn);
      });
    }
  }
}
