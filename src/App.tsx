import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Index from "./pages/Index";
import CitizenPortal from "./pages/CitizenPortal";
import AdminDashboard from "./pages/AdminDashboard";
import CitizenAuth from "./pages/CitizenAuth";
import AdminAuth from "./pages/AdminAuth";
import ComplaintTracking from "./pages/ComplaintTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/citizen-auth" element={<CitizenAuth />} />
          <Route path="/admin-auth" element={<AdminAuth />} />
          <Route path="/citizen" element={<CitizenPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/tracking" element={<ComplaintTracking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
