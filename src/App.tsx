import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TouristDashboard from "./pages/TouristDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/tourist-dashboard" 
              element={
                <ProtectedRoute allowedPortalTypes={['tourist']}>
                  <TouristDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/parent-dashboard" 
              element={
                <ProtectedRoute allowedPortalTypes={['parent']}>
                  <ParentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/authority-dashboard" 
              element={
                <ProtectedRoute allowedPortalTypes={['authority']}>
                  <AuthorityDashboard />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
