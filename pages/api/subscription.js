import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const getCustomerCharges = async (customer) => {
  return await stripe.charges.list({
    customer,
  });
};

const getCustomerPaymentMethods = async (customer) => {
  return await stripe.paymentMethods.list({
    customer,
    type: "card",
  });
};

const chargeLastMonth = async (amount, customer) => {
  const paymentMethods = await getCustomerPaymentMethods(customer);
  return await stripe.paymentIntents.create({
    customer,
    amount: amount,
    confirm: true,
    currency: "usd",
    payment_method: paymentMethods.data[0].id,
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
    // only charge once
    const charges = await getCustomerCharges(req.body.data.object.customer);
    if (charges.data.length === 1) {
      await chargeLastMonth(
        req.body.data.object.plan.amount,
        req.body.data.object.customer
      );
    }
  }

  res.end(JSON.stringify(returnObject));
  return;
};
