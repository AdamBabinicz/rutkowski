import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./lib/i18n";

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

function Router() {
  return (
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
  );
}

function App() {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <TooltipProvider>
              <Helmet>
                <title>{t("nav.brand")}</title>
                <meta name="description" content={t("footer.description")} />
              </Helmet>
              <div className="min-h-screen bg-gradient-to-br from-watercolor-warm-white via-background to-watercolor-sage dark:from-watercolor-charcoal dark:via-gray-900 dark:to-watercolor-charcoal-light transition-all duration-300">
                <Navbar />
                <Suspense fallback={<div>{t("loading")}</div>}>
                  <Router />
                </Suspense>
                <Footer />
                <ScrollToTopButton />
              </div>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
