'use client'
import { ReactNode, useState } from "react";

const overviewStats = [
  { value: 3, label: "Completed cases" },
  { value: 2, label: "Cases to target" },
];

const shelvedCases = [
  { type: "Endo", status: "Completed" },
  { type: "Pedo", status: "Completed" },
  { type: "Operative", status: "Completed" },
  { type: "Perio", status: "In Progress" },
  { type: "Fixed", status: "In Progress" },
  { type: "Surgery", status: "In Progress" },
];

const patients = [
  { name: "Ahmed Ali", specialty: "Endo" },
  { name: "Sara Hassan", specialty: "Surgery" },
  { name: "Omar Khaled", specialty: "Operative" },
];

const messages = [
  {
    name: "Ahmed Ali",
    time: "10:45 AM",
    text: "Hello, I'm checking about my next appointment...",
    initials: "AA",
    color: "from-teal-400 to-cyan-500",
    online: true,
  },
  {
    name: "Clinic Support",
    time: "Yesterday",
    text: "New patient data has been updated in the system.",
    initials: "CS",
    color: "from-slate-500 to-slate-700",
    online: false,
  },
  {
    name: "Mary K.",
    time: "2 days ago",
    text: "The lab results for Case #829 are ready.",
    initials: "MK",
    color: "from-rose-400 to-pink-600",
    online: false,
  },
];

/* ── Sub-components ── */

const StatusBadge = ({ status }: { status: string }) => {
  const ok = status === "Completed";
  return (
    <span
      className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap ${
        ok ? "text-emerald-500" : "text-amber-500"
      }`}
    >
      {ok ? (
        <>
          Completed
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </>
      ) : (
        <>
          In Progress
          <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-pulse" />
        </>
      )}
    </span>
  );
};

const Avatar = ({ initials, color }:{initials:string,color:string }) => (
  <div
    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0 shadow-md`}
  >
    {initials}
  </div>
);

const PersonIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const SectionHeading = ({ children }:{children:ReactNode}) => (
  <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4 tracking-tight">
    {children}
  </h2>
);

/* ── Main Component ── */

export default function DentifyDashboard() {
  const [activeMessage, setActiveMessage] = useState<null | number>(null);

  return (
    <div
      className="min-h-screen  px-4 py-5 sm:px-6 sm:py-7"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

        {/* ── Overview ── */}
        <section>
          <SectionHeading>Overview</SectionHeading>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {overviewStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 sm:p-8 flex flex-col items-center justify-center group"
              >
                <span className="text-5xl sm:text-6xl font-extrabold text-slate-900 group-hover:scale-105 transition-transform duration-200 leading-none">
                  {stat.value}
                </span>
                <span className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-400 font-medium tracking-wide text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Shelved Cases by Type ── */}
        <section>
          <SectionHeading>Cheived cases by type</SectionHeading>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* Mobile: single column list */}
            <div className="sm:hidden divide-y divide-slate-100">
              {shelvedCases.map((c) => (
                <div
                  key={c.type}
                  className="flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-slate-700 font-medium text-sm">{c.type}</span>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>

            {/* sm+: two-column grid */}
            <div className="hidden sm:grid sm:grid-cols-2 divide-x divide-slate-100">
              <div className="divide-y divide-slate-100">
                {shelvedCases.filter((_, i) => i % 2 === 0).map((c) => (
                  <div
                    key={c.type}
                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-slate-700 font-medium text-sm">{c.type}</span>
                    <StatusBadge status={c.status} />
                  </div>
                ))}
              </div>
              <div className="divide-y divide-slate-100">
                {shelvedCases.filter((_, i) => i % 2 !== 0).map((c) => (
                  <div
                    key={c.type}
                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-slate-700 font-medium text-sm">{c.type}</span>
                    <StatusBadge status={c.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Patients & Messages ──
             Mobile: stacked full-width
             md+:   side by side 50/50               */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">

          {/* My Current Patients */}
          <section>
            <SectionHeading>My current patients</SectionHeading>
            <div className="space-y-2.5 sm:space-y-3">
              {patients.map((p) => (
                <div
                  key={p.name}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 px-4 sm:px-5 py-3.5 sm:py-4 flex items-center gap-3 sm:gap-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors duration-150">
                    <PersonIcon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-800 font-semibold text-sm leading-tight truncate">{p.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">Patient ( {p.specialty} )</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-slate-300 flex-shrink-0 group-hover:text-slate-500 transition-colors duration-150"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </section>

          {/* My Recent Messages */}
          <section>
            <SectionHeading>My recent messages</SectionHeading>
            <div className="space-y-2.5 sm:space-y-3">
              {messages.map((m, i) => (
                <div
                  key={m.name + i}
                  onClick={() => setActiveMessage(activeMessage === i ? null : i)}
                  className={`bg-white rounded-2xl border transition-all duration-200 px-4 sm:px-5 py-3.5 sm:py-4 flex items-start gap-3 sm:gap-4 cursor-pointer active:scale-[0.98] ${
                    activeMessage === i
                      ? "border-blue-200 shadow-md ring-1 ring-blue-100"
                      : "border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar initials={m.initials} color={m.color} />
                    {m.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-slate-800 font-semibold text-sm truncate">{m.name}</p>
                      <span className="text-slate-400 text-xs flex-shrink-0">{m.time}</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">{m.text}</p>
                    {activeMessage === i && (
                      <div className="mt-3 flex gap-2 flex-wrap">
                        <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors">
                          Reply
                        </button>
                        <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium hover:bg-slate-200 active:bg-slate-300 transition-colors">
                          View thread
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}