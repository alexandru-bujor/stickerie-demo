import { useCallback, useEffect, useState } from "react";
import { isProductId } from "../data/calculators";
import type { Route } from "../types";

/*
 * Tiny hash router, so the demo runs anywhere (also from a static host) without a server config.
 *   #/                     home
 *   #/studio               studio
 *   #/calculator/banner    calculator
 *   #/stickere             catalog
 *   #/contact              contact
 */

export function parseHash(hash: string): Route {
  const [, page = "", arg = ""] = hash.replace(/^#/, "").split("/");
  if (page === "studio") return { page: "studio" };
  if (page === "calculator") return { page: "calculator", product: isProductId(arg) ? arg : "sticker" };
  if (page === "stickere") return { page: "catalog" };
  if (page === "contact") return { page: "contact" };
  return { page: "home" };
}

export function routeToHash(r: Route): string {
  switch (r.page) {
    case "studio": return "#/studio";
    case "calculator": return `#/calculator/${r.product}`;
    case "catalog": return "#/stickere";
    case "contact": return "#/contact";
    default: return "#/";
  }
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((r: Route) => {
    const hash = routeToHash(r);
    // keep catalog filters that the hash cannot carry
    setRoute(r);
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    window.scrollTo(0, 0);
  }, []);

  return { route, navigate };
}
