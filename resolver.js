const client = require("./elephantsql");
const axios = require("axios");

const resolvers = {
  User: {
    account: async (user) => {
      var bankAcc;
      if (user.bank_accounts.length > 1)
        bankAcc = "'" + user.bank_accounts.join("','") + "'";
      else bankAcc = "'" + user.bank_accounts[0] + "'";
      const accData = await client.query(
        `SELECT * FROM accounts WHERE ifsc IN (${bankAcc})`
      );
      return accData.rows;
    },
  },
  Account: {
    weather: async (acc) => {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${acc.city}&appid=${process.env.WEATHER_API}`
      );
      const weatherData = {
        city: acc.city,
        temp: weatherRes.data.main.temp,
        humidity: weatherRes.data.main.humidity,
      };
      return weatherData;
    },
  },
  Query: {
    getAllUsers: async () => {
      const userData = await client.query("SELECT * FROM users ");
      return userData.rows;
    },
  },

  Mutation: {
    addAccountDetails: async (_, { data }) => {
      const user = await client.query(
        `SELECT * FROM users WHERE id = ${data.user_id}`
      );
      if (user.rowCount == 0) {
        // create a user and add the fields
        const insertQ =
          "INSERT INTO users(id,name,bank_accounts) VALUES($1, $2, $3) RETURNING * ";
        const values = [data.user_id, data.user_name, data.bank_accounts];
        const newUser = await client.query(insertQ, values);
      } else {
        // add new bank accounts given in the query
        var newBankAcc = "";
        if (data.bank_accounts.length == 1) newBankAcc = data.bank_accounts[0];
        else newBankAcc = data.bank_accounts.join(",");
        const updateAccounts = await client.query(
          `UPDATE users SET bank_accounts = array_cat(bank_accounts, '{${newBankAcc}}') WHERE id = ${data.user_id};`
        );
      }
      return {
        id: data.user_id,
        name: data.user_name,
        bank_accounts: data.bank_accounts,
      };
    },
  },
};

module.exports = resolvers;
