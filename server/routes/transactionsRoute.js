import express from "express";
import Transaction from "../models/transactionModel.js";
import moment from "moment";

const router = express.Router();

router.post("/add-transaction", async (req, res) => {
  const newTransaction = new Transaction(req.body);

  try {
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit-transaction", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      { _id: req.body.transactionId },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.log(error);
  }
});

router.put("/delete-transaction", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.body.transactionId);
    res.status(200).json("Transaction deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

router.post("/get-all-transactions", async (req, res) => {
  const { frequency, selectedRange, type } = req.body;
  try {
    const transactions = await Transaction.find({
      userId: req.body.userId,
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
  }
});

export default router;
