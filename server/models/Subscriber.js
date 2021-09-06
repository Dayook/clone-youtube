const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Video Collection
const SubscriberSchema = mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", SubscriberSchema);

module.exports = { Subscriber };
