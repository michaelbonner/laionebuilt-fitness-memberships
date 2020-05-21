import Head from "next/head";

const Home = () => (
  <div className="bg-gray-200 min-h-screen flex items-center justify-center">
    <Head>
      <title>Laionbuilt Fitness Membership</title>
    </Head>

    <div className="bg-white overflow-hidden shadow rounded-lg w-full lg:w-2/3">
      <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
        <h1 className="text-lg text-center m-4">Check Your Membership</h1>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p className="bg-green-200">Test Tailwind</p>
      </div>
    </div>
  </div>
);

export default Home;
