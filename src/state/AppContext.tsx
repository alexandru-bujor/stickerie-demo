import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CALCULATORS, defaultValues } from "../data/calculators";
import { DEFAULT_DESIGN } from "../data/design";
import { readStore, STORAGE_KEYS, writeStore } from "../lib/storage";
import type { CalcValues, CartItem, ProductId, Route, SavedProject, StickerDesign, UploadedImage } from "../types";
import { useHashRoute } from "./router";

/*
 * One context for the app-wide state of the demo:
 * routing, toast, cart, saved projects, the Studio sticker design and the calculator values.
 * Each piece is small, so one provider keeps the wiring simple.
 */

type NewProject = SavedProject extends infer P ? (P extends SavedProject ? Omit<P, "id" | "date"> : never) : never;

interface AppState {
  route: Route;
  navigate: (r: Route) => void;

  toast: string | null;
  showToast: (message: string) => void;

  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  projects: SavedProject[];
  saveProject: (p: NewProject) => void;
  deleteProject: (id: number) => void;

  design: StickerDesign;
  updateDesign: (patch: Partial<StickerDesign>) => void;
  studioImage: UploadedImage | null;
  setStudioImage: (img: UploadedImage | null) => void;

  calcValues: Record<ProductId, CalcValues>;
  setCalcValues: (id: ProductId, v: CalcValues) => void;
  calcImage: UploadedImage | null;
  setCalcImage: (img: UploadedImage | null) => void;
}

const AppContext = createContext<AppState | null>(null);

const initialCalcValues = () =>
  Object.fromEntries(Object.values(CALCULATORS).map((p) => [p.id, defaultValues(p)])) as Record<ProductId, CalcValues>;

export function AppProvider({ children }: { children: ReactNode }) {
  const { route, navigate } = useHashRoute();

  /* toast */
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const showToast = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  /* cart */
  const [cart, setCart] = useState<CartItem[]>(() => readStore(STORAGE_KEYS.cart, []));
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => writeStore(STORAGE_KEYS.cart, cart), [cart]);
  const addToCart = useCallback((item: Omit<CartItem, "id">) => {
    setCart((c) => [...c, { ...item, id: Date.now() + Math.random() }]);
    showToast(`Adăugat în coș: ${item.name}`);
  }, [showToast]);
  const removeFromCart = useCallback((id: number) => setCart((c) => c.filter((i) => i.id !== id)), []);

  /* saved projects */
  const [projects, setProjects] = useState<SavedProject[]>(() => readStore(STORAGE_KEYS.projects, []));
  useEffect(() => writeStore(STORAGE_KEYS.projects, projects), [projects]);
  const saveProject = useCallback((p: NewProject) => {
    const full = { ...p, id: Date.now(), date: new Date().toLocaleDateString("ro-RO") } as SavedProject;
    setProjects((list) => [full, ...list].slice(0, 8));
    showToast("Proiect salvat. Îl găsești pe pagina principală.");
  }, [showToast]);
  const deleteProject = useCallback((id: number) => setProjects((list) => list.filter((p) => p.id !== id)), []);

  /* studio design (images are not persisted: object URLs die with the page) */
  const [design, setDesign] = useState<StickerDesign>(() => ({ ...DEFAULT_DESIGN, ...readStore<Partial<StickerDesign>>(STORAGE_KEYS.design, {}) }));
  useEffect(() => writeStore(STORAGE_KEYS.design, design), [design]);
  const updateDesign = useCallback((patch: Partial<StickerDesign>) => setDesign((d) => ({ ...d, ...patch })), []);
  const [studioImage, setStudioImageState] = useState<UploadedImage | null>(null);
  const setStudioImage = useCallback((img: UploadedImage | null) => {
    setStudioImageState((old) => {
      if (old && old.url !== img?.url) URL.revokeObjectURL(old.url);
      return img;
    });
  }, []);

  /* calculators */
  const [calcValues, setAllCalc] = useState<Record<ProductId, CalcValues>>(initialCalcValues);
  const setCalcValues = useCallback((id: ProductId, v: CalcValues) => setAllCalc((all) => ({ ...all, [id]: v })), []);
  const [calcImage, setCalcImageState] = useState<UploadedImage | null>(null);
  const setCalcImage = useCallback((img: UploadedImage | null) => {
    setCalcImageState((old) => {
      if (old && old.url && old.url !== img?.url) URL.revokeObjectURL(old.url);
      return img;
    });
  }, []);

  const value = useMemo<AppState>(() => ({
    route, navigate, toast, showToast,
    cart, addToCart, removeFromCart, cartOpen, setCartOpen,
    projects, saveProject, deleteProject,
    design, updateDesign, studioImage, setStudioImage,
    calcValues, setCalcValues, calcImage, setCalcImage,
  }), [route, navigate, toast, showToast, cart, addToCart, removeFromCart, cartOpen, projects, saveProject, deleteProject,
    design, updateDesign, studioImage, setStudioImage, calcValues, setCalcValues, calcImage, setCalcImage]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
