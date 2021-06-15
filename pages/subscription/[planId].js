import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

const Plan = () => {
  const router = useRouter();
  const { planId } = router.query;
  const [state, setState] = useState("initial");

  useLayoutEffect(() => {
    const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    async function fetchStripeCheckoutSession() {
      let response = await (await fetch(`/api/plan/${planId}`)).json();
      if (!response.data) {
        setState("error");
        return;
      }

      setState("loaded");
      stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    }
    if (planId) {
      fetchStripeCheckoutSession();
    }
  }, [planId]);

  if (state === "error") {
    return (
      <div
        className={`min-h-screen flex flex-col space-y-8 items-center justify-center px-4 transition duration-300 ease-in-out bg-gray-200`}
      >
        <div className="flex space-x-4 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-gray-300 transform rotate-45 hover:-rotate-12 transition-all"
            viewBox="0 0 512 512"
          >
            <title>Bug</title>
            <path
              d="M370 378c28.89 23.52 46 46.07 46 86M142 378c-28.89 23.52-46 46.06-46 86M384 208c28.89-23.52 32-56.07 32-96M128 206c-28.89-23.52-32-54.06-32-94M464 288.13h-80M128 288.13H48M256 192v256"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <path
              d="M256 448h0c-70.4 0-128-57.6-128-128v-96.07c0-65.07 57.6-96 128-96h0c70.4 0 128 25.6 128 96V320c0 70.4-57.6 128-128 128z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <path
              d="M179.43 143.52a49.08 49.08 0 01-3.43-15.73A80 80 0 01255.79 48h.42A80 80 0 01336 127.79a41.91 41.91 0 01-3.12 14.3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>
          <p className="text-3xl text-gray-300">Oops</p>
        </div>
        <p className="text-xl">
          Subscription could not be found. Please{" "}
          <a
            className="underline"
            href="https://www.laionebuiltfitness.com/about-us-contact"
          >
            contact us
          </a>{" "}
          to let us know.
        </p>
        <p>
          <a className="underline text-5xl" href="tel:+18014535055">
            801-453-5055
          </a>
        </p>
        <div className="flex space-x-2 pt-4">
          <a
            className="py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-400 shadow-md text-white transition-all"
            href="https://www.laionebuiltfitness.com/about-us-contact"
          >
            Contact us
          </a>
          <button
            className="py-2 px-4 rounded-md bg-black hover:bg-gray-800 shadow-md text-white transition-all"
            onClick={() => window.history.back()}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 transition duration-300 ease-in-out`}
    >
      <Script src="https://js.stripe.com/v3/" strategy="beforeInteractive" />
      <Head>
        <title>Laionebuilt Fitness Membership</title>
      </Head>

      <div className="w-full lg:w-2/3 my-4">Redirecting to checkout...</div>
    </div>
  );
};

export default Plan;
