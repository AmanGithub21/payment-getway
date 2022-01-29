const router = require("express").Router();
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get("/orderId", async (req, res) => {
  try {
    // const { token, amount } = req.body;
    const orderId = await instance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
    console.log("orderId", orderId);
    res.status(200).json(orderId);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
});

module.exports = router;
