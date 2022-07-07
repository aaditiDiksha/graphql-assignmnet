const pg = require("pg");
const conString = process.env.PG_URL; //Can be found in the Details page
const client = new pg.Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("database connected");
 
  });
});

module.exports = client;