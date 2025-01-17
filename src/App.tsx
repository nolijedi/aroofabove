import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import WhyChooseUs from "./pages/WhyChooseUs";
import Contact from "./pages/Contact";
import Estimate from "./pages/Estimate";
import InsuranceClaims from "./pages/InsuranceClaims";
import PromoCountdown from "./components/PromoCountdown";
import ScrollToTop from "./components/ScrollToTop";
import StickyPhone from "./components/StickyPhone";

// Add styles to hide Lovable widget
const styles = document.createElement('style');
styles.innerHTML = `
  #lovable-widget {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
`;
document.head.appendChild(styles);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen relative flex flex-col">
          {/* Background Image and Overlay */}
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24?q=80&w=2070')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-roofing-orange/60 to-roofing-cream/40" />
          </div>
          
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/why-choose-us" element={<WhyChooseUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/estimate" element={<Estimate />} />
              <Route path="/insurance-claims" element={<InsuranceClaims />} />
            </Routes>
          </main>
          <Footer />
          <PromoCountdown />
          <StickyPhone />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;