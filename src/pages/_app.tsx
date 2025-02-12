import type { AppProps } from 'next/app';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromoCountdown from "@/components/PromoCountdown";
import StickyPhone from "@/components/StickyPhone";
import { ChatWidget } from "@/components/ChatWidget";
import TopBar from "@/components/TopBar";
import '@/styles/globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TopBar />
        <Navbar />
        <PromoCountdown />
        <Component {...pageProps} />
        <StickyPhone />
        <ChatWidget />
        <Footer />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
