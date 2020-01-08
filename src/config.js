module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://utahslim:develop@localhost/utahslim',
  JWT_SECRET: process.env.JWT_SECRET || 'all-the-things-you-are'
}