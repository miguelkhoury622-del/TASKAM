"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Upload } from "lucide-react";

const steps = ["Personal Info", "Skills & Experience", "ID Verification", "Done"];

const services = ["Cleaning", "Plumbing", "Electrical", "Appliance Repair", "Painting", "Carpentry", "Furniture Assembly", "Landscaping", "Moving", "Security Installation"];

export default function TechnicianApplyPage() {
  const [step, setStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (s: string) => {
    setSelectedServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="py-12 text-center" style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #2a5298 100%)" }}>
        <h1 className="text-3xl font-black text-white mb-2">Become a Taskam Pro</h1>
        <p className="text-blue-200 max-w-md mx-auto text-sm">
          Join 500+ professionals earning ₦50,000–₦200,000/month on Taskam.
        </p>
        <div className="flex items-center justify-center gap-6 mt-6">
          {["Flexible hours", "Weekly payouts", "Free training"].map((b) => (
            <span key={b} className="flex items-center gap-1.5 text-xs text-blue-100">
              <CheckCircle size={14} className="text-green-400" /> {b}
            </span>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Steps */}
        <div className="flex items-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={i <= step ? { backgroundColor: "#1B3A6B", color: "white" } : { backgroundColor: "#e2e8f0", color: "#94a3b8" }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium text-center ${i === step ? "text-slate-900" : "text-slate-400"}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 mb-5" style={{ backgroundColor: i < step ? "#1B3A6B" : "#e2e8f0" }} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Personal Information</h2>
              {[
                { label: "Full Name", placeholder: "Emeka Okafor", type: "text" },
                { label: "Phone Number", placeholder: "+234 801 234 5678", type: "tel" },
                { label: "Email Address", placeholder: "emeka@gmail.com", type: "email" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2" />
                </div>
              ))}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">State / City</label>
                <select className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 bg-white">
                  {["Lagos", "Abuja (FCT)", "Rivers", "Kano", "Oyo"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Short Bio</label>
                <textarea placeholder="Tell us about yourself and your experience..." rows={3} className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 resize-none" />
              </div>
            </div>
          )}

          {/* Step 1: Skills */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Skills & Services</h2>
              <p className="text-sm text-slate-500 mb-5">Select all the services you can provide.</p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {services.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleService(s)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 text-left transition-all ${
                      selectedServices.includes(s) ? "text-white border-transparent" : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                    style={selectedServices.includes(s) ? { backgroundColor: "#1B3A6B" } : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Years of experience</label>
                <select className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 bg-white">
                  <option>Less than 1 year</option>
                  <option>1-2 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: ID Verification */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Identity Verification</h2>
              <p className="text-sm text-slate-500 mb-5">
                We verify all professionals for customer safety. Your information is secure.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">ID Type</label>
                  <select className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 bg-white">
                    <option>NIN (National ID Number)</option>
                    <option>Driver's License</option>
                    <option>Voter's Card</option>
                    <option>International Passport</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">ID Number</label>
                  <input type="text" placeholder="Enter your ID number" className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">Upload ID Document</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-slate-300 transition-colors">
                    <Upload size={24} className="text-slate-400" />
                    <p className="text-sm text-slate-500 text-center">Click to upload or drag and drop<br /><span className="text-xs">PNG, JPG up to 5MB</span></p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">Profile Photo</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-slate-300 transition-colors">
                    <Upload size={20} className="text-slate-400" />
                    <p className="text-sm text-slate-500">Upload a clear photo of your face</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Done */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#F0FDF4" }}>
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-2">Application Submitted!</h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                We&apos;ll review your application and get back to you within 24-48 hours via phone or WhatsApp.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 mb-6">
                <p><strong>What happens next?</strong></p>
                <ol className="mt-2 space-y-1 text-left list-decimal list-inside">
                  <li>Our team reviews your application</li>
                  <li>We verify your ID and credentials</li>
                  <li>You receive a call/WhatsApp with next steps</li>
                  <li>Complete your brief online training</li>
                  <li>Start receiving job bookings!</li>
                </ol>
              </div>
              <Link href="/" className="inline-block px-6 py-3 rounded-xl text-white font-semibold text-sm" style={{ backgroundColor: "#1B3A6B" }}>
                Back to Home
              </Link>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 3 && (
          <div className="flex items-center gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="flex-1 py-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Back
              </button>
            )}
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3.5 rounded-xl text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
              style={{ backgroundColor: "#F97316" }}
            >
              {step === 2 ? "Submit Application" : "Continue"}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
