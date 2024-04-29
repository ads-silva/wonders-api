Wonders Api
=======

Welcome to Wonders, the Warehouse Management API project! This project provides a simple example of a warehouse management API built using JavaScript, Express, and Sequelize.

## 📦 Setup
To get started with the project, follow these steps:

Make sure that [Node.js](https://nodejs.org/en/) `>= 20` installed on your system.

```sh
# 1 Clone the repository:
git clone https://github.com/ads-silva/wonders-api.git

# 2 Navigate to the project directory:
cd wonders-api

# 3 Install dependencies:
npm install
```
* Before continue, we need set up environment variables for the project, follow these steps:

  1. **Locate the `.env.sample` file in the project directory.**

  2. Copy the .env.sample file and rename it to .env.

  3. Open the .env file and configure the environment variables according to your setup.


## 🐋 Docker Setup
This project includes a `docker-compose.yaml` file to build and run MariaDB used by the API.

To set up the database using Docker, follow these steps:
```sh
# 4 Start the MariaDB container:
docker-compose up -d

# 5 Verify the container is running:
docker ps

# You should see a container named `mariadb` listed.
```

## 🗳️ Database Setup and Population
To set up the database and populate it with data, follow these steps:

```sh
# 6 Reset the database and populate with data:
npm run reset:db
```

## 🧪 Running Tests
1. To run e2e tests for the API, follow these steps:
    `npm run test:e2e`

2. Execute tests using Postman:
Import the provided Postman collection file api-tests. `wonders-api.postman_collection.json` and run the collection to test API endpoints.

### 👥 Users and very strong passwords (😂):
    requester@mail.com / 123  
    manager@mail.com / 123
    
## To run
1. To run, type the follow command:
    `npm run start:dev`

    
# Technologies Stack

- [Express](https://expressjs.com/): a minimal and flexible Node.js web application framework
- [Sequelize](https://sequelize.org/): a promise-based Node.js ORM for SQL databases
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JSON Web Token implementation for Node.js
- [Eslint](https://eslint.org/): ESLint for identifying problematic patterns found in JavaScript code.
