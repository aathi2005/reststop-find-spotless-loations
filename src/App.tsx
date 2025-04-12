
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Map from "./pages/Map";
import Nearby from "./pages/Nearby";
import Favorites from "./pages/Favorites";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import RestroomDetail from "./pages/RestroomDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Map />} />
            <Route path="/map" element={<Map />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/restroom/:id" element={<RestroomDetail />} />
            <Route path="/search" element={<Map />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
