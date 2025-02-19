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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
