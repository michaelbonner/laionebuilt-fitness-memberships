import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const chargeLastMonth = async (amount, customer) => {
  return await stripe.charges.create({
    amount,
    currency: "usd",
    customer,
    description: "Membership payment for last month",
  });
};

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const returnObject = {
    success: true,
    data: [],
  };

  if (req.body.type === "customer.subscription.created") {
    await chargeLastMonth(
      req.body.data.object.plan.amount,
      req.body.data.object.customer
    );
  }

  res.end(JSON.stringify(returnObject));
  return;
};
