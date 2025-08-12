// Plik: App.tsx (WERSJA DIAGNOSTYCZNA)

import { Switch, Route, useLocation } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, useEffect } from "react";

import Home from "@/pages/home"; // To jest nasz minimalny, testowy home.tsx
import NotFound from "@/pages/not-found";

const ScrollToTopOnNavigate = () => {
  const [pathname] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function Router() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Router />
        </Suspense>
      </div>
    </HelmetProvider>
  );
}

export default App;
