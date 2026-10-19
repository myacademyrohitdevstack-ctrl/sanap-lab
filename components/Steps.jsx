import Reveal from "./Reveal";
import { Search, CalendarCheck, Droplets, FileCheck2, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Select Test or Package",
    description: "Browse individual diagnostic tests or comprehensive health checkup packages.",
    icon: Search,
  },
  {
    step: "02",
    title: "Book Online or Call Desk",
    description: "Submit a simple booking request, call us directly, or reach out via WhatsApp.",
    icon: CalendarCheck,
  },
  {
    step: "03",
    title: "Hygienic Sample Draw",
    description: "Follow fasting or specific guidelines, then visit our lab or have a phlebotomist visit your home.",
    icon: Droplets,
  },
  {
    step: "04",
    title: "Receive Verified Results",
    description: "Access your verified digital test report directly on WhatsApp, email, or pick up a hard copy.",
    icon: FileCheck2,
  },
];

export default function Steps() {
  return (
    <section className="py-14 sm:py-20 bg-mist border-t border-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
              <span>Simple Workflow</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sage mt-1">
              How Diagnostic Testing Works
            </h2>
            <p className="text-xs sm:text-sm text-ink/75 mt-2">
              From choosing your test to receiving verified results in 4 straightforward steps.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} delay={idx * 0.05}>
                <div className="bg-white p-6 rounded-2xl border border-soft shadow-2xs h-full relative flex flex-col justify-between hover:shadow-md hover:border-care/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-soft text-care flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-extrabold text-sage/40 tracking-wider">
                        STEP {item.step}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-sage">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-soft/60 flex items-center text-[11px] font-semibold text-care">
                    <span>Step verified</span>
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
