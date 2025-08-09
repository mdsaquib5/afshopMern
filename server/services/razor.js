import Razorpay from "razorpay";

// Create order at razor pay

const razorOrderCreate = async (order) => {
  try {
    const razorpay = new Razorpay({
      key_id: 'rzp_live_kz1xRCwqd6Zb93',
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    console.log("Razor Charge");

    const options = {
      amount: 10 * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const rzOrder = await razorpay.orders.create(options);
    return rzOrder;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to create order New");
  }
};

export default razorOrderCreate;