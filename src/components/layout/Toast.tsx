import { useApp } from "../../state/AppContext";

export function Toast({ raised = false }: { raised?: boolean }) {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div
      role="status"
      className={`fixed left-1/2 z-[90] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-full bg-ink px-[18px] py-3 text-center font-semibold text-paper shadow-sticker-red ${
        raised ? "bottom-[calc(96px+env(safe-area-inset-bottom,0px))] lg:bottom-[calc(24px+env(safe-area-inset-bottom,0px))]" : "bottom-[calc(24px+env(safe-area-inset-bottom,0px))]"
      }`}
    >
      {toast}
    </div>
  );
}
