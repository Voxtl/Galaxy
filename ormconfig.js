module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.DB_PASS,
    database: "galaxy",
    synchronize: true,
    logging: true,
    entities: [
        "src/entities/**/*.ts"
    ],
    migrations: [
        "/migrations/**/*.ts"
    ],
    subscribers: [
        "/subscriber/**/*.ts"
    ],
    cli: {
        "entitiesDir": "src/entities",
        "migrationsDir": "migrations",
        "subscribersDir": "src/subscriber"
    },
    cache: {
        type: "redis",
        options: {
            host: "localhost",
            port: 6739
        }
    }
}