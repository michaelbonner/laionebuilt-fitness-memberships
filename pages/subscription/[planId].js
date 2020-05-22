import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";

const Plan = () => {
  const router = useRouter();
  const { planId } = router.query;

  useLayoutEffect(() => {
    const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    async function fetchStripeCheckoutSession() {
      let response = await (await fetch(`/api/plan/${planId}`)).json();
      stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    }
    fetchStripeCheckoutSession();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 transition duration-300 ease-in-out`}
    >
      <Head>
        <title>Laionebuilt Fitness Membership</title>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>

      <div className="w-full lg:w-2/3 my-4">Plan: {planId}</div>
    </div>
  );
};

export default Plan;
