import { useEffect, useState } from "react";
import { AnnounceBar } from "./components/layout/AnnounceBar";
import { CartDrawer } from "./components/layout/CartDrawer";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Toast } from "./components/layout/Toast";
import { CalculatorPage } from "./pages/CalculatorPage";
import { CatalogPage } from "./pages/CatalogPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { StudioPage } from "./pages/StudioPage";
import { useApp } from "./state/AppContext";

export default function App() {
  const { route } = useApp();
  useFontsReady();

  return (
    <>
      <AnnounceBar />
      <Header />
      <main>
        {route.page === "home" && <HomePage />}
        {route.page === "studio" && <StudioPage />}
        {route.page === "calculator" && <CalculatorPage productId={route.product} />}
        {route.page === "catalog" && <CatalogPage initialFilter={route.filter} query={route.query} />}
        {route.page === "contact" && <ContactPage />}
      </main>
      <Footer />
      <CartDrawer />
      <Toast raised={route.page === "calculator"} />
    </>
  );
}

/** Sticker sizes are measured from the web fonts, so re-render once they have loaded. */
function useFontsReady() {
  const [, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => alive && setReady(true));
    return () => { alive = false; };
  }, []);
}
