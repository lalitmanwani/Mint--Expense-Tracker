const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

//User Schema

const UserSchema = mongoose.Schema({
  name: {
    type: "String",
  },
  email: {
    type: "String",
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },

  expenses: [
    {
      createdAt: {
        type: Date,
      },
      amount: {
        type: Number,
      },
      description: {
        type: String,
      },
    },
  ],
  income: [
    {
      createdAt: {
        type: Date,
      },
      amount: {
        type: Number,
      },
      description: {
        type: String,
      },
    },
  ],
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username };

  User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
  // Creating a hash for the password and save
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
//Save the Expense
module.exports.totaladdExpense = function (username, body, callback) {
  User.findByIdAndUpdate(
    { _id: username },
    {
      $push: {
        expenses: {
          $each: [
            {
              createdAt: body.date,
              amount: body.amount,
              description: body.description,
            },
          ],
        },
      },
    },

    { new: true, useFindAndModify: false },
    callback
  );
};

//Update Expense
module.exports.updateExpense = function (expid, body, callback) {
  User.updateOne(
    { "expenses._id": expid },
    {
      $set: {
        "expenses.$.createdAt": Date.now(),
        "expenses.$.amount": body.amount,
        "expenses.$.description": body.description,
      },
    },

    { new: true },
    callback
  );
};

//Delete Expense
module.exports.deleteExpense = function (originalid, expid, callback) {
  User.updateOne(
    { _id: originalid },
    {
      $pull: {
        expenses: { _id: expid },
      },
    },

    { new: true },
    callback
  );
};

//Add Income
module.exports.totaladdIncome = function (username, body, callback) {
  User.findByIdAndUpdate(
    { _id: username },
    {
      $push: {
        income: {
          $each: [
            {
              createdAt: body.date,
              amount: body.amount,
              description: body.description,
            },
          ],
        },
      },
    },

    { new: true, useFindAndModify: false },
    callback
  );
};

module.exports.deleteIncome = function (originalid, expid, callback) {
  User.updateOne(
    { _id: originalid },
    {
      $pull: {
        income: { _id: expid },
      },
    },

    { new: true },
    callback
  );
};

module.exports.updateIncome = function (expid, body, callback) {
  User.updateOne(
    { "income._id": expid },
    {
      $set: {
        "income.$.createdAt": Date.now(),
        "income.$.amount": body.amount,
        "income.$.description": body.description,
      },
    },

    { new: true },
    callback
  );
};
