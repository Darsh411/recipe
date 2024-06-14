// const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('Uncaught Exception, shutting down...');
  process.exit(1);
});

// dotenv.config({ path: './config.env' });
const app = require('./app');

// const DB = process.env.DATABASE_CLOUD;
const DB = "mongodb://127.0.0.1:27017/Recipe";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect(DB, options)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
const port =  7000;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unandled Rejection, shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
