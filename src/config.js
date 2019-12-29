module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://utahslim:develop@localhost/utahslim',
  JWT_SECRET: process.env.JWT_SECRET || 'all-the-things-you-are'
}