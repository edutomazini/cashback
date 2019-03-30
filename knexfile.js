
module.exports = {
  client: 'mysql',
  //connection: process.env.LOCALBASE_URL || 'mysql://root:pretinha@127.0.0.1:3306/cashback',
  connection: process.env.LOCALBASE_URL || 'mysql://dwyzeebkjglicvc9:oa09o2f2zsj63261@e764qqay0xlsc4cz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/c3zm360vj5ueuzvx',
  pool: {
    afterCreate: function (conn, done) {
      conn.query('set @@session.time_zone = "-06:00";', function (err) {
        if (err) {
          // first query failed, return error and don't try to make next query
          done(err, conn);
        } else {
          // do the second query...
          conn.query('SELECT now();', function (err) {
            // if err is not falsy, connection is discarded from pool
            // if connection aquire was triggered by a query the error is passed to query promise
            done(err, conn);
          });
        }
      });
    }
  }
}
