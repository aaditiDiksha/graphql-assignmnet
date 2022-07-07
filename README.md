### Internship assignmnet - graphql-assignmnet
#### Hosted on Glitch -
https://prairie-fluffy-bonsai.glitch.me/graphql


1. NodeJS project with Apollo GraphQL API. 
2. The API accept the following mutation:
```
    mutation {
	addAccountDetails(data: {
		user_id: 1,
		user_name: "John Doe",
		back_accounts: [
			"HDFC0CAGSBK",
			"HDFC0003933"
		]
	}) {
		id
		name
		accounts {
			bank
			branch
			address
			city
			district
			state
			bank_code
			weather {
				temp
				humidity
			}
		}
	}
}
```
3. Allows anonymous users to add and read all data.
4. Uses the following APIs for data:
  -> [https://ifsc.razorpay.com](https://ifsc.razorpay.com/)
  -> [https://openweathermap.org/api](https://openweathermap.org/api)
5. Uses free database service - ElephantSQL for cloud postgreSQL
