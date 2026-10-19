"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";
import { HelpCircle, ChevronDown, ChevronUp, Phone, MessageCircle } from "lucide-react";

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const waUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I have a question about diagnostic tests that was not listed in the FAQs.`,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Title */}
      <Reveal>
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Laboratory Answers</span>
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sage mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-ink/75 mt-2">
            Answers regarding test booking, home sample collection, fasting requirements, and report dispatch.
          </p>
        </div>
      </Reveal>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <Reveal key={faq.question} delay={idx * 0.04}>
              <div className="bg-white rounded-2xl border border-soft shadow-xs overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full min-h-[52px] px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-sage hover:text-care focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="p-1 rounded-lg bg-soft text-care flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-ink/80 leading-relaxed border-t border-soft/60 bg-mist/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <Reveal delay={0.3} className="mt-12 bg-gradient-to-r from-soft to-mist p-6 sm:p-8 rounded-3xl border border-soft text-center max-w-xl mx-auto shadow-2xs">
        <h3 className="text-base sm:text-lg font-bold text-sage">
          Still have questions regarding your tests?
        </h3>
        <p className="text-xs sm:text-sm text-ink/75 mt-1.5 leading-relaxed">
          Our laboratory team is happy to explain test preparations, prices, and sample pickup details.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${site.phone}`}
            className="min-h-[42px] px-4 rounded-xl bg-white border border-soft text-sage text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-mist transition-colors shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-care" />
            <span>Call Desk: +{site.phone}</span>
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[42px] px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
            <span>WhatsApp Our Team</span>
          </a>
        </div>
      </Reveal>
    </div>
  );
}
