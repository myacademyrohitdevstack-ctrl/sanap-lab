import Link from "next/link";
import { site } from "@/data/site";
import Reveal from "@/components/Reveal";
import { ShieldCheck, Lock, FileText, Mail, Phone, ArrowLeft } from "lucide-react";

export const metadata = {
  title: `Privacy & Data Policy | ${site.name}`,
  description: `Learn how ${site.name} safeguards patient privacy, protects booking details, and handles clinical report delivery.`,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      <Reveal>
        <div className="max-w-2xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Confidentiality Safeguards</span>
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sage mt-1">
            Privacy Policy & Data Handling
          </h1>
          <p className="text-xs sm:text-sm text-ink/75 mt-2">
            Last updated: October 2026. This policy outlines how {site.name} collects, protects, and handles your diagnostic requests and test records.
          </p>
        </div>
      </Reveal>

      <div className="bg-white rounded-3xl border border-soft p-6 sm:p-8 shadow-xs space-y-8 text-xs sm:text-sm text-ink/80 leading-relaxed">
        {/* Section 1 */}
        <section>
          <h2 className="text-base font-bold text-sage mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-care" />
            <span>1. Information We Collect</span>
          </h2>
          <p>
            When you request home sample collection or contact our diagnostic centre, we collect only the minimum necessary contact and scheduling information:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-ink/75">
            <li>Your name and 10-digit mobile number for communication and confirmation.</li>
            <li>Your locality or residential address for phlebotomist dispatch.</li>
            <li>Requested diagnostic test or package name, and your preferred date.</li>
            <li>Any optional notes or scheduling instructions you choose to supply.</li>
          </ul>
          <p className="mt-2 font-semibold text-sage">
            We do not collect sensitive unverified medical histories through web forms, nor do we require public document uploads.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-base font-bold text-sage mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-care" />
            <span>2. Purpose of Collection</span>
          </h2>
          <p>
            The details you provide are utilized exclusively to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-ink/75">
            <li>Coordinate phlebotomist appointments for home collection.</li>
            <li>Confirm test preparation, fasting instructions, and verified test pricing over the telephone or WhatsApp.</li>
            <li>Transmit verified electronic diagnostic reports directly and privately to you.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-base font-bold text-sage mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-care" />
            <span>3. Strict Confidentiality & Report Access</span>
          </h2>
          <p>
            In accordance with diagnostic data safety standards:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-ink/75">
            <li>We do not operate public, unauthenticated report-lookup portals keyed by phone numbers or guessable patient IDs.</li>
            <li>Diagnostic findings are confidential medical documents and are shared only with the patient or their legally authorized representative via verified direct channels (direct phone, encrypted WhatsApp, email, or sealed physical collection at our centre).</li>
            <li>We never sell, rent, or distribute patient contact details or test data to third-party marketing services.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-base font-bold text-sage mb-2">
            4. Data Retention and Security
          </h2>
          <p>
            Diagnostic booking records and laboratory sample logs are stored securely with restricted access limited strictly to certified laboratory personnel. We maintain regular system audits to prevent unauthorized data exposure.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-base font-bold text-sage mb-2">
            5. Contacting Our Data Officer
          </h2>
          <p>
            If you have questions regarding your data privacy or wish to update your contact preferences, please reach out to our administration desk:
          </p>
          <div className="mt-3 p-4 rounded-2xl bg-mist border border-soft text-xs space-y-1.5">
            <p><strong className="text-sage">Laboratory:</strong> {site.name}</p>
            <p><strong className="text-sage">Address:</strong> {site.address}, {site.city}</p>
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-care" />
              <span>{site.email || `care@${site.url.replace("https://", "")}`}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-care" />
              <span>+{site.phone}</span>
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-xs font-bold text-care hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home Page</span>
        </Link>
      </div>
    </div>
  );
}
