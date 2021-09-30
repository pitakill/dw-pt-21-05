const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
  },
  { timestamps: true }
);

Schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

mongoose.model("User", Schema);
