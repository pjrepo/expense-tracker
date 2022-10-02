import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TransactionSchema = Schema({
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default model("Transaction", TransactionSchema);
