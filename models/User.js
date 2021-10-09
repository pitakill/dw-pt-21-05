const mongoose = require("mongoose");

const BirthSchema = new mongoose.Schema({
  day: Number,
  month: Number,
  year: Number,
});

const CardSchema = new mongoose.Schema({
  number: Number,
  cvc: Number,
  month: Number,
  year: Number,
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birth: BirthSchema,
    card: CardSchema,
  },
  { timestamps: true }
);

// https://stackoverflow.com/questions/31728988/using-javascript-whats-the-quickest-way-to-recursively-remove-properties-and-va
function removeProperty(obj, p) {
  for (prop in obj) {
    if (prop === p) {
      delete obj[prop];
    } else if (typeof obj[prop] === "object") {
      removeProperty(obj[prop], p);
    }
  }
}

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    removeProperty(ret, "_id");
  },
});

mongoose.model("User", UserSchema);
