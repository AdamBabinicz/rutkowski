// Plik: App.tsx (Ostateczna, poprawna wersja dla Twojego projektu)

import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, useEffect, useState } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import ArtworkDetail from "@/pages/artwork-detail";
import Contact from "@/pages/contact";
import Exhibitions from "@/pages/exhibitions";
import Archive from "@/pages/archive";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import CookiesPolicy from "@/pages/cookies-policy";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import AnnouncementModal from "@/components/AnnouncementModal";

const ScrollToTopOnNavigate = () => {
  const [pathname] = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

function Router() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/exhibitions" component={Exhibitions} />
        <Route path="/archive" component={Archive} />
        <Route path="/about" component={About} />
        <Route path="/artwork/:id" component={ArtworkDetail} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/cookies-policy" component={CookiesPolicy} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            {/* KLUCZOWA ZMIANA - Ten div jest teraz prosty */}
            <div className="transition-all duration-300">
              <Navbar />
              <Suspense fallback={<div>Ładowanie...</div>}>
                <Router />
              </Suspense>
              <Footer onAnnouncementClick={() => setIsAnnouncementOpen(true)} />
              <ScrollToTopButton />
              <AnnouncementModal
                isOpen={isAnnouncementOpen}
                setIsOpen={setIsAnnouncementOpen}
              />
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
