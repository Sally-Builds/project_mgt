const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel')
const bcrypt = require('bcryptjs')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;

const db = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(async () => {
  console.log('DB connection successful!')
  importData()
}
  );

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
}

const importData = async () => {
  try {
    // password = await hashPassword(process.env.ADMIN_PASSWORD)
    password = process.env.ADMIN_PASSWORD
    const newUser = User.create({
        password: password,
        confirmPassword: password,
        role: 'admin',
        fullName: "Administrator",
        staffID: "AdminStaff",
      });
      console.log('successfully created admin')
    //   mongoose.disconnect().then(() => console.log('DB Disconnected'))
      return 'successfully created admin';
  } catch (err) {
    console.log(err);
  }
  process.exit()
};
