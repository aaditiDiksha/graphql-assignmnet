const { gql } = require("apollo-server-express");

const typeDefs = gql`
  
  type User {
     id: ID
    name: String
    account: [Account]
  }
  input UserInput {
    user_id:ID
    user_name:String
    bank_accounts:[String]
  }
  type Account {
    ifsc: String
    bank: String
    branch: String
    city: String
    district: String
    state: String
    bank_code: String
    address: String
    weather: Weather
  }
  type Weather {
    city: String
    temp: String
    humidity: Int
  }
  type Query {
    getAllUsers: [User]
  }


  type Mutation {
    addAccountDetails(
      data: UserInput
      ) : User
  }

  
`;
module.exports = typeDefs;
