import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { CheckCircle2, Clock, Phone, AlertCircle, ArrowLeft } from "lucide-react";

export default function BookingConfirmation({ onReset }) {
  const waContactUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I just submitted a home collection request online and would like to confirm receipt.`,
  });

  return (
    <div className="bg-white rounded-3xl border border-care/40 p-6 sm:p-8 text-center shadow-md max-w-lg mx-auto">
      <div className="w-16 h-16 bg-emerald-50 text-care rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-2xs">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-sage">
        Request Received
      </h3>

      <div className="mt-4 p-4 rounded-2xl bg-mist border border-soft text-xs sm:text-sm text-ink/80 leading-relaxed text-left space-y-2">
        <div className="flex items-center gap-2 font-bold text-sage">
          <Clock className="w-4 h-4 text-care flex-shrink-0" />
          <span>The lab will contact you to confirm time, availability, price and preparation.</span>
        </div>
        <p className="text-ink/70">
          Please note that home sample collection slots are subject to phlebotomist availability in your area. Your appointment is not finalized until our desk calls or messages you to confirm.
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={waContactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto min-h-[44px] px-5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
          <span>Message Lab on WhatsApp</span>
        </a>

        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto min-h-[44px] px-5 rounded-xl border border-soft text-sage text-xs sm:text-sm font-semibold hover:bg-mist transition-colors"
          >
            Submit Another Request
          </button>
        ) : (
          <Link
            href="/"
            className="w-full sm:w-auto min-h-[44px] px-5 rounded-xl border border-soft text-sage text-xs sm:text-sm font-semibold hover:bg-mist inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        )}
      </div>
    </div>
  );
}
