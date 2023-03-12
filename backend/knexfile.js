module.exports = {
    local: {
        client: 'mysql',
        debug: true,
        connection: {
            host: process.env.MYSQL_LOCAL_HOST,
            user: process.env.MYSQL_LOCAL_USER,
            password: process.env.MYSQL_LOCAL_PASS,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DB
        }
    },
    cloud: {
        client: 'mysql',
        debug: true,
        connection: {
            host: process.env.MYSQL_CLOUD_HOST,
            user: process.env.MYSQL_CLOUD_USER,
            password: process.env.MYSQL_CLOUD_PASS,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DB
        }
    }
};