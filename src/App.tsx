
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Medications from "./pages/Medications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Framer Motion for animations
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  // Register service worker for future PWA support
  useEffect(() => {
    // Check if we are in production and service workers are supported
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        // In a real app, we would register the service worker here
        console.log('Service Worker would be registered in production');
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/medications" element={<Medications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
