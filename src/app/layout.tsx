'use client';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromoCountdown from "@/components/PromoCountdown";
import ScrollToTop from "@/components/ScrollToTop";
import StickyPhone from "@/components/StickyPhone";
import { ChatWidget } from "@/components/ChatWidget";
import TopBar from "@/components/TopBar";
import { ChatButton } from "@/components/chat/ChatButton";
import "@/styles/globals.css";

const queryClient = new QueryClient();

export const metadata = {
  title: 'A Roof Above - Professional Roofing Services',
  description: 'Professional roofing services for residential and commercial properties. Quality workmanship guaranteed.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="min-h-screen bg-white">
        <QueryClientProvider client={queryClient}>
          <TopBar />
          <Navbar />
          <PromoCountdown />
          {children}
          <Footer />
          <ScrollToTop />
          <StickyPhone />
          <ChatButton />
          <ChatWidget />
          <Toaster />
          <Sonner />
          <Analytics />
        </QueryClientProvider>
      </body>
    </html>
  );
}
