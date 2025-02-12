import Hero from "@/components/Hero";
import Features from "@/components/home/Features";
import Head from 'next/head';

const Index = () => {
  return (
    <>
      <Head>
        <title>A Roof Above - Professional Roofing Services</title>
        <meta name="description" content="Professional roofing services in your area. Get instant estimates and expert consultation." />
      </Head>
      <main className="min-h-screen">
        <Hero />
        <Features />
      </main>
    </>
  );
};

export default Index;