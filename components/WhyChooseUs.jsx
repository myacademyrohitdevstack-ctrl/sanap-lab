import Reveal from "./Reveal";
import { ShieldCheck, MessageSquare, FileCheck2, Thermometer, TestTube2, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "Sterile, Single-Use Equipment",
    description: "Every sample is drawn using pre-sealed, sterile disposable needles and vacuum tubes to prevent contamination.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-care border-emerald-200",
  },
  {
    title: "Transparent Communication",
    description: "Clear preparation guidelines and verified test prices confirmed upfront by our team before sampling begins.",
    icon: MessageSquare,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    title: "Direct Digital Report Delivery",
    description: "Once verified by our lab technicians, digital test reports are delivered promptly via WhatsApp and email.",
    icon: FileCheck2,
    color: "bg-teal-50 text-teal-600 border-teal-200",
  },
  {
    title: "Dedicated Cool-Chain Transport",
    description: "Samples are transported in temperature-controlled cooler boxes to preserve sample integrity for accurate lab analysis.",
    icon: Thermometer,
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Laboratory Quality Standards</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sage mt-1">
              Why Patients Choose Our Laboratory
            </h2>
            <p className="text-xs sm:text-sm text-ink/75 mt-2">
              We focus on dependable pathology practices, patient safety, and genuine transparency.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={idx * 0.05}>
                <div className="p-6 rounded-2xl border border-soft bg-mist/30 h-full flex flex-col justify-between hover:bg-white hover:shadow-md hover:border-care/40 transition-all group">
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border shadow-2xs group-hover:scale-110 transition-transform ${r.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-sage">
                      {r.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-soft/60 flex items-center gap-1 text-[11px] font-semibold text-care">
                    <span>Verified Protocol</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
