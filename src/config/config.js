const dotenv = require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        database: process.env.DB_NAME_DEV,
        port: process.env.DB_PORT_DEV,
        host: process.env.DB_HOST_DEV,
        dialect: "postgres",
    },
    test: {
        username: process.env.DB_USERNAME_TEST,
        password: process.env.DB_PASSWORD_TEST,
        database: process.env.DB_NAME_TEST,
        port: process.env.DB_PORT_TEST,
        host: process.env.DB_HOST_TEST,
        dialect: "postgres",
    },
    production: {
        use_env_variable: "DATABASE_URL",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
