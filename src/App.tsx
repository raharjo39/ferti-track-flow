
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Warehouse from "./pages/Warehouse";
import FieldSite from "./pages/FieldSite";
import FarmerApp from "./pages/FarmerApp";
import Tracking from "./pages/Tracking";
import NotFound from "./pages/NotFound";
import AccessCode from "./components/auth/AccessCode";
import Login from "./components/auth/Login";

const queryClient = new QueryClient();

const App = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user has access and is authenticated on app load
  useEffect(() => {
    const savedAccess = localStorage.getItem("fertitrack-access");
    const savedAuth = localStorage.getItem("fertitrack-auth");
    
    if (savedAccess === "granted") {
      setHasAccess(true);
    }
    
    if (savedAuth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
    localStorage.setItem("fertitrack-access", "granted");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("fertitrack-auth", "authenticated");
  };

  // Show access code page if no access
  if (!hasAccess) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AccessCode onAccessGranted={handleAccessGranted} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show login page if access granted but not authenticated
  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Login onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show main app if both access and authentication are complete
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/field-site" element={<FieldSite />} />
            <Route path="/farmer-app" element={<FarmerApp />} />
            <Route path="/tracking" element={<Tracking />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
