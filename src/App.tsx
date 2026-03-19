import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import DSASheet from "./pages/DSASheet.tsx";
import ProblemDetail from "./pages/ProblemDetail.tsx";
import Subjects from "./pages/Subjects.tsx";
import Contests from "./pages/Contests.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dsa" element={<DSASheet />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;