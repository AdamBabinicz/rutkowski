import { useState, useEffect } from "react";

/**
 * Custom hook, który zwraca reaktywny obiekt URLSearchParams.
 * Śledzi on wszystkie zmiany w adresie URL (w tym parametry)
 * i wymusza ponowne renderowanie komponentu, który go używa.
 */
export function useQueryString() {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  useEffect(() => {
    const updateParams = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };

    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      updateParams();
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      updateParams();
    };

    window.addEventListener("popstate", updateParams);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", updateParams);
    };
  }, []);

  return searchParams;
}
