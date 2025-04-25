export default () => ({
  port: parseInt(process.env.PORT) || 6001,

  database: {
    url: process.env.DATABASE_URL,
  },

  googleDrive: {
    credentials: JSON.parse(process.env.GOOGLE_DRIVE_CREDENTIALS),
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
  },

  meilisearch: {
    host: process.env.MEILISEARCH_HOST,
    apiKey: process.env.MEILISEARCH_API_KEY,
  },

  redis: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
});
