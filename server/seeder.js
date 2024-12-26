const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

const connectDb = require('./config/db');

const Admin = require('./models/Admin');
const User = require('./models/User');
const Pizza = require('./models/Pizza');
const users = require('./data/users');
const admins = require('./data/admins');
const pizzas = require('./data/pizzas');

dotenv.config();

// Connect to MongoDB
connectDb();

const importData = async () => {
  try {
    await Pizza.deleteMany();
    await User.deleteMany();
    await Admin.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdAdmin = await Admin.insertMany(admins);

    // Insertion des pizzas
    const createdPizzas = await Pizza.insertMany(pizzas);  // Décommentez cette ligne

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Admin.deleteMany();
    await Pizza.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
