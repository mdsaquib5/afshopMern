import Product from "../models/Product.js";
import Order from "../models/Order.js";
import stripe from "stripe";
import User from "../models/User.js";
import razorOrderCreate from "../services/razor.js";
import crypto from "crypto";

//  Place Order COD : /api/order/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    // Calculate Amount using items
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        amount += product.offerPrice * item.quantity;
      }
    }

    // Add tax charge 2%
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//  Get Order by userid : /api/order/user

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createAt: -1 });
    res.json({ success: true, message: orders });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//  Get All Orders for Seller & Admin : /api/order/seller

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createAt: -1 });

    res.json({ success: true, message: orders });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Place Order stripe : /api/order/stripe

export const placeOrderStripe = async (req, res) => {
  console.log("placeOrderStripe Run");
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    let productData = [];

    // Calculate Amount using items
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      if (product) {
        amount += product.offerPrice * item.quantity;
      }
    }

    // Add tax charge 2%
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    // Strip gateway Initialize

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // Create line items for stripe
    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    // Create Session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Stripe webhook to verify the payment Action : /stripe

export const stripWebHooks = async (request, response) => {
  // stripe gateway initialize
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  const sig = request.headers["stripe-signature"];

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    response.status(400).send(`Webhook Error: ${error.messages}`);
  }

  // handle the event

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Getting Session MetaData
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId, userId } = session.data[0].metadata;

      // Mark payemnt as paid
      await Order.findByIdAndUpdate(orderId, { isPaid: true });

      // Clear user Cart Data
      await User.findByIdAndUpdate(userId, { cartItems: {} });
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Getting Session MetaData
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId } = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
      break;
    }
    default:
      console.error(`UnHandled event type ${event.type}`);
      break;
  }
  response.json({ received: true });
};

// Razor pay

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    let productData = [];

    // Calculate Amount using items
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      if (product) {
        amount += product.offerPrice * item.quantity;
      }
    }

    // Add tax charge 2%
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      payemntGateway: "Razorpay",
    });

    // Razor gateway Initialize
    const rozorData = await razorOrderCreate(order);
    console.log("Console Rz Data", rozorData);

    return res.json({ success: true, rozorData, orderIdm: order._id });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const verifyRazorpay1 = async (req, res) => {
  console.log("Verify Razor Func", req.body);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyRazorpay = async (req, res) => {
  console.log("Verify Razor Func", req.body);

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      orderIdm,
    } = req.body;

    const order = await Order.findById(orderIdm);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    const isValid = razorpay_signature === expectedSign;

    if (isValid) {
      order.status = "Paid";
      order.isPaid = true;
      order.paymentGateway = "razorpay";
      order.paymentLog.push({
        status: "success",
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        message: "Payment verified successfully",
        date: new Date(),
      });

      await order.save();
      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      order.status = "Payment Failed";
      order.isPaid = false;
      order.paymentLog.push({
        status: "failed",
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        message: "Invalid signature",
        date: new Date(),
      });

      await order.save();
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Verify Razorpay Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};