import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Services from "./pages/Services";
import WhyChooseUs from "./pages/WhyChooseUs";
import Contact from "./pages/Contact";
import Estimate from "./pages/Estimate";
import PromoCountdown from "./components/PromoCountdown";
import ScrollToTop from "./components/ScrollToTop";
import StickyPhone from "./components/StickyPhone";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen relative">
          {/* Background Image and Overlay */}
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24?q=80&w=2070')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-roofing-charcoal/90 to-transparent" />
          </div>
          
          <Navbar />
          <div className="pt-32"> {/* Increased padding to accommodate the lowered logo */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/why-choose-us" element={<WhyChooseUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/estimate" element={<Estimate />} />
            </Routes>
          </div>
          <PromoCountdown />
          <StickyPhone />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;