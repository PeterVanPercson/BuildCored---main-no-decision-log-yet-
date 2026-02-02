import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Engineers from "./pages/Engineers";
import Companies from "./pages/Companies";
import CompanyView from "./pages/CompanyView";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import About from "./pages/About";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/engineers" element={<Engineers />} />
          <Route path="/companies" element={<Companies />} />
          {/* Using :token dynamic segment for company view */}
          <Route path="/company/:token" element={<CompanyView />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problem/:id" element={<Problem />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
