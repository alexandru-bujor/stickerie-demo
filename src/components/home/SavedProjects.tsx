import { lei } from "../../lib/format";
import { useApp } from "../../state/AppContext";
import { Button } from "../ui/Button";
import { SectionHead } from "../ui/SectionHead";

/** Projects saved from the Studio or a calculator. Hidden until there is at least one. */
export function SavedProjects() {
  const { projects, deleteProject, navigate, updateDesign, setStudioImage, setCalcValues } = useApp();
  if (!projects.length) return null;

  return (
    <section className="pb-14 pt-3">
      <div className="wrap">
        <SectionHead eyebrow="Salvate pe acest dispozitiv" title="Proiectele tale" />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {projects.map((p) => (
            <div key={p.id} className="plate peel flex flex-col gap-1.5 p-4">
              <span className="eyebrow !text-[11px]">{p.kind === "studio" ? "Studio" : "Calculator"} · {p.date}</span>
              <span className="font-bold">{p.title}</span>
              <span className="text-[13px] text-ink-2">{p.summary}</span>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[17px] font-semibold">{lei(p.total)}</span>
                <span className="flex items-center gap-3">
                  <button className="cursor-pointer p-0 text-[13px] text-brand underline" onClick={() => deleteProject(p.id)}>Șterge</button>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (p.kind === "studio") {
                        updateDesign(p.design);
                        setStudioImage(null);
                        navigate({ page: "studio" });
                      } else {
                        setCalcValues(p.product, p.values);
                        navigate({ page: "calculator", product: p.product });
                      }
                    }}
                  >
                    Deschide
                  </Button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
