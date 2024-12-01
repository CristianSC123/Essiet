const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    family_name: { type: String, required: true },
    given_name: { type: String, required: true },
  },
  { collection: "usuarios" }
);

const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
