export const configuration = () => ({
  databasePostgres: {
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT
      ? parseInt(process.env.DB_POSTGRES_PORT, 10)
      : 5432,
    user: process.env.DB_POSTGRES_USER,
    password: process.env.DB_POSTGRES_PASSWORD,
    name: process.env.DB_POSTGRES_NAME,
    trigger: process.env.DB_POSTGRES_TRIGGER
      ? JSON.parse(process.env.DB_POSTGRES_TRIGGER)
      : false,
  },
  redis: {
    host: process.env.DB_REDIS_HOST || 'localhost',
    port: process.env.DB_REDIS_PORT
      ? parseInt(process.env.DB_REDIS_PORT, 10)
      : 6379,
    ttl: process.env.DB_REDIS_TTL ? parseInt(process.env.DB_REDIS_TTL) : 0,
  },

  awsS3: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
  },
});

export enum EConfiguration {
  DB_POSTGRES_HOST = 'databasePostgres.host',
  DB_POSTGRES_PORT = 'databasePostgres.port',
  DB_POSTGRES_USER = 'databasePostgres.user',
  DB_POSTGRES_PASSWORD = 'databasePostgres.password',
  DB_POSTGRES_NAME = 'databasePostgres.name',
  DB_POSTGRES_TRIGGER = 'databasePostgres.trigger',

  DB_REDIS_HOST = 'redis.host',
  DB_REDIS_PORT = 'redis.port',
  DB_REDIS_TTL = 'redis.ttl',

  AWS_S3_ACCESS_KEY_ID = 'awsS3.accessKeyId',
  AWS_S3_SECRET_ACCESS_KEY = 'awsS3.secretAccessKey',
  AWS_S3_REGION = 'awsS3.region',
  AWS_S3_PUBLIC_BUCKET = 'awsS3.bucket',
}
