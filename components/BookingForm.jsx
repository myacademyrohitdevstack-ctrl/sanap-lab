"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { tests } from "@/data/tests";
import { packages } from "@/data/packages";
import BookingConfirmation from "./BookingConfirmation";
import { User, Phone, MapPin, Calendar, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export default function BookingForm({ initialService = "test", initialItem = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    locality: "",
    service: initialService || "test",
    serviceItem: initialItem || "",
    preferredDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate() {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your name.";
    }

    const cleanMobile = formData.mobile.replace(/[^\d]/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      errs.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.locality.trim()) {
      errs.locality = "Please enter your locality or area.";
    }

    if (!formData.preferredDate) {
      errs.preferredDate = "Please choose a preferred date.";
    }

    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.error || "Unable to submit booking request. Please call our lab.");
        }
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setServerError("Network error. Please call the lab directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <BookingConfirmation
        onReset={() => {
          setIsSuccess(false);
          setFormData({
            name: "",
            mobile: "",
            locality: "",
            service: "test",
            serviceItem: "",
            preferredDate: "",
            notes: "",
          });
        }}
      />
    );
  }

  // Get today's date formatted as YYYY-MM-DD for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-3xl border border-soft p-6 sm:p-8 shadow-sm max-w-xl mx-auto">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
          <span>Home Phlebotomy</span>
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-sage">
          Request Doorstep Sample Collection
        </h3>
        <p className="text-xs sm:text-sm text-ink/70 mt-1 leading-relaxed">
          Fill in your details. Our coordination desk will call you to confirm collection slot, test price, and preparation.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-sage mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-care" />
            <span>Full Name <span className="text-red-500">*</span></span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ramesh Kulkarni"
            className={`w-full min-h-[46px] px-3.5 rounded-xl border text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-care ${
              errors.name ? "border-red-400 bg-red-50/30" : "border-soft bg-mist/40"
            }`}
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobile" className="block text-xs font-bold uppercase tracking-wider text-sage mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-care" />
            <span>Mobile Number <span className="text-red-500">*</span></span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-xs text-ink/50 font-bold">+91</span>
            <input
              id="mobile"
              type="tel"
              required
              maxLength={10}
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/[^\d]/g, "") })}
              placeholder="98XXXXXXXX"
              className={`w-full min-h-[46px] pl-12 pr-3.5 rounded-xl border text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-care ${
                errors.mobile ? "border-red-400 bg-red-50/30" : "border-soft bg-mist/40"
              }`}
            />
          </div>
          {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
        </div>

        {/* Locality */}
        <div>
          <label htmlFor="locality" className="block text-xs font-bold uppercase tracking-wider text-sage mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-care" />
            <span>Locality in {site.city} <span className="text-red-500">*</span></span>
          </label>
          <input
            id="locality"
            type="text"
            required
            list="service-areas"
            value={formData.locality}
            onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
            placeholder="e.g. Kothrud, Baner, Shivajinagar"
            className={`w-full min-h-[46px] px-3.5 rounded-xl border text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-care ${
              errors.locality ? "border-red-400 bg-red-50/30" : "border-soft bg-mist/40"
            }`}
          />
          <datalist id="service-areas">
            {site.serviceAreas.map((area) => (
              <option key={area} value={area} />
            ))}
          </datalist>
          {errors.locality && <p className="text-xs text-red-600 mt-1">{errors.locality}</p>}
        </div>

        {/* Service Type Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-sage mb-1.5">
            Service Required <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "test", label: "Individual Test" },
              { id: "package", label: "Health Package" },
              { id: "help-choosing", label: "Help Choosing" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFormData({ ...formData, service: option.id, serviceItem: "" })}
                className={`min-h-[46px] px-2 py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                  formData.service === option.id
                    ? "bg-care text-white border-care shadow-xs"
                    : "bg-mist/50 text-ink/80 border-soft hover:bg-mist"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Specific Test/Package Selector if applicable */}
        {formData.service === "test" && (
          <div>
            <label htmlFor="serviceItem" className="block text-xs font-bold uppercase tracking-wider text-sage mb-1">
              Select Specific Test (Optional)
            </label>
            <select
              id="serviceItem"
              value={formData.serviceItem}
              onChange={(e) => setFormData({ ...formData, serviceItem: e.target.value })}
              className="w-full min-h-[46px] px-3.5 rounded-xl border border-soft bg-mist/40 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-care"
            >
              <option value="">-- Choose a test or specify in notes --</option>
              {tests.map((t) => (
                <option key={t.slug} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.service === "package" && (
          <div>
            <label htmlFor="servicePackageItem" className="block text-xs font-bold uppercase tracking-wider text-sage mb-1">
              Select Package (Optional)
            </label>
            <select
              id="servicePackageItem"
              value={formData.serviceItem}
              onChange={(e) => setFormData({ ...formData, serviceItem: e.target.value })}
              className="w-full min-h-[46px] px-3.5 rounded-xl border border-soft bg-mist/40 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-care"
            >
              <option value="">-- Choose a package or specify in notes --</option>
              {packages.map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Preferred Date */}
        <div>
          <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-sage mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-care" />
            <span>Preferred Date <span className="text-red-500">*</span></span>
          </label>
          <input
            id="preferredDate"
            type="date"
            required
            min={today}
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className={`w-full min-h-[46px] px-3.5 rounded-xl border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-care ${
              errors.preferredDate ? "border-red-400 bg-red-50/30" : "border-soft bg-mist/40"
            }`}
          />
          {errors.preferredDate && <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>}
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-sage mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-care" />
            <span>Doctor&apos;s Prescription or Specific Notes (Optional)</span>
          </label>
          <textarea
            id="notes"
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="e.g. Doctor prescribed fasting CBC & sugar; please call 10 mins before arriving."
            className="w-full p-3.5 rounded-xl border border-soft bg-mist/40 text-xs sm:text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-care"
          />
          <p className="text-[11px] text-ink/50 mt-1">
            Do not enter sensitive confidential medical records. We verify details over the phone.
          </p>
        </div>

        {/* Action Button: Specific microcopy "Request Home Collection" */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full min-h-[48px] rounded-xl bg-care text-white font-bold text-sm sm:text-base hover:bg-sage active:scale-[0.99] transition-all disabled:opacity-60 shadow-md inline-flex items-center justify-center gap-2"
          >
            <span>{submitting ? "Submitting Request..." : "Request Home Collection"}</span>
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}
