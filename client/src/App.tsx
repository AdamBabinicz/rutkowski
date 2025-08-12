// Plik: App.tsx (WERSJA OSTATECZNEJ DIAGNOZY)

import { Switch, Route } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";

import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
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
