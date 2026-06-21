'use client'
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const egyptianUniversities = [
  { name: "Cairo University", city: "Cairo" },
  { name: "Ain Shams University", city: "Cairo" },
  { name: "Helwan University", city: "Cairo" },
  { name: "Beni Suef University", city: "Beni Suef" },
  { name: "Fayoum University", city: "Fayoum" },
  { name: "Alexandria University", city: "Alexandria" },
  { name: "Damanhour University", city: "Damanhour" },
  { name: "Kafr El-Sheikh University", city: "Kafr El-Sheikh" },
  { name: "Tanta University", city: "Tanta" },
  { name: "Mansoura University", city: "Mansoura" },
  { name: "Damietta University", city: "Damietta" },
  { name: "Port Said University", city: "Port Said" },
  { name: "Suez Canal University", city: "Ismailia" },
  { name: "Sinai University", city: "North Sinai" },
  { name: "Arish University", city: "Arish" },
  { name: "Zagazig University", city: "Zagazig" },
  { name: "Benha University", city: "Benha" },
  { name: "Menoufia University", city: "Shibin El-Kom" },
  { name: "Sohag University", city: "Sohag" },
  { name: "Assiut University", city: "Assiut" },
  { name: "South Valley University", city: "Qena" },
  { name: "Aswan University", city: "Aswan" },
  { name: "Luxor University", city: "Luxor" },
  { name: "Minia University", city: "Minia" },
  { name: "New Valley University", city: "Kharga" },
  { name: "Matrouh University", city: "Matrouh" },
  { name: "October 6 University", city: "Giza" },
  { name: "Modern Sciences & Arts University (MSA)", city: "Giza" },
  { name: "Misr International University (MIU)", city: "Cairo" },
  { name: "British University in Egypt (BUE)", city: "Cairo" },
  { name: "German University in Cairo (GUC)", city: "Cairo" },
  { name: "American University in Cairo (AUC)", city: "Cairo" },
  { name: "Nile University", city: "Giza" },
  { name: "Arab Academy for Science & Technology", city: "Alexandria" },
  { name: "Misr University for Science & Technology (MUST)", city: "Giza" },
  { name: "Future University in Egypt (FUE)", city: "Cairo" },
  { name: "Pharos University", city: "Alexandria" },
  { name: "Arab Open University", city: "Cairo" },
  { name: "Galala University", city: "Suez" },
  { name: "King Salman International University", city: "South Sinai" },
  { name: "Alamein International University", city: "El Alamein" },
];

const caseTypes = [
  { id: "endo", label: "Endo" },
  { id: "operative", label: "Operative" },
  { id: "perio", label: "Perio" },
  { id: "fixed", label: "Fixed" },
  { id: "removable", label: "Removable" },
  { id: "surgery", label: "Surgery" },
];

// ── Multi-select with checkboxes — mirrors shadcn Select trigger/content ──────
function CaseSelect({ selected, onChange }: { selected: string[]; onChange: (selected: string[]) => void }) {
  const [open, setOpen] = useState(false);

  const toggle = (id: string) =>
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );

  const label =
    selected.length === 0
      ? null
      : selected.length === 1
      ? caseTypes.find((c) => c.id === selected[0])?.label
      : `${selected.length} cases selected`;

  return (
    <div className="relative  w-full">
      {/* ── Trigger: identical classes to shadcn SelectTrigger ── */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={!label ? "text-muted-foreground" : ""}>
          {label ?? "case"}
        </span>
        {/* Same chevron SVG shadcn injects */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 opacity-50 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* ── Dropdown: identical look to shadcn SelectContent ── */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
            <div className="p-1 bg-white max-h-60 overflow-y-auto">
              {caseTypes.map((c) => {
                const checked = selected.includes(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground hover:bg-gray-100"
                  >
                    {/* Checkbox that matches the rest of the site */}
                    <div
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        checked
                          ? "bg-[#1a2340] border-[#1a2340]"
                          : "border-input bg-background"
                      }`}
                    >
                      {checked && (
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          className="h-3 w-3"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span>{c.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SelectCase() {
  const [university, setUniversity] = useState("");
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const isValid = university && selectedCases.length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#eef0f8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* Heading */}
        <h1 className="text-center text-[#1a2340] font-extrabold text-2xl sm:text-3xl md:text-4xl mb-8 tracking-tight">
          choose your needed case.
        </h1>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl px-6 sm:px-10 py-8 sm:py-10 space-y-6">

          {/* ── Selects row ── */}
          <div className="flex flex-col sm:flex-row gap-4">

            {/* University — shadcn Select (unchanged API) */}
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-[#1a2340]/60 uppercase tracking-widest pl-1">
                University
              </label>
              <Select value={university} onValueChange={setUniversity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="university" />
                </SelectTrigger>
                <SelectContent className="max-h-64 bg-white">
                  <SelectGroup>
                    {egyptianUniversities.map((u) => (
                      <SelectItem className="hover:bg-gray-100 data-[state=checked]:bg-gray-100 " key={u.name} value={u.name}>
                        {u.name}
                        <span className="ml-2 text-xs text-muted-foreground">
                          — {u.city}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Case type — custom multi-select, same trigger look */}
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-[#1a2340]/60 uppercase tracking-widest pl-1">
                Case Type
              </label>
              <CaseSelect selected={selectedCases} onChange={setSelectedCases} />
            </div>
          </div>

          {/* ── Selected-case pill badges ── */}
          {selectedCases.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCases.map((id) => {
                const c = caseTypes.find((x) => x.id === id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1a2340]/10 text-[#1a2340] text-xs font-medium px-3 py-1"
                  >
                    {c?.label}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCases((prev) => prev.filter((s) => s !== id))
                      }
                      className="opacity-60 hover:opacity-100 transition-opacity leading-none"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* ── Divider ── */}
          <div className="border-t border-[#1a2340]/10" />

          {/* ── Submit ── */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid}
              className={`px-14 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-200 shadow-md
                ${
                  isValid
                    ? "bg-[#1a2340] text-white hover:bg-[#0f1628] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-[#1a2340]/30 text-white/60 cursor-not-allowed"
                }`}
            >
              {submitted ? "✓ Submitted!" : "Submit"}
            </button>

            {!isValid && (
              <p className="text-xs text-[#1a2340]/40">
                Select a university and at least one case type.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}