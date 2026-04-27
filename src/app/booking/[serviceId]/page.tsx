"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { ChevronRight, MapPin, Calendar, Clock, CreditCard, Banknote, Building } from "lucide-react";
import { getServiceById } from "@/lib/data/services";
import { createBooking, saveAddress, validatePromoCode } from "@/lib/data/bookings";
import toast from "react-hot-toast";

const steps = ["Location", "Date & Time", "Payment", "Confirm"];
const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
const nigerianStates = ["Lagos", "Abuja (FCT)", "Rivers", "Kano", "Ogun", "Oyo", "Anambra", "Delta", "Enugu", "Kaduna"];

function formatNaira(n: number) { return "₦" + n.toLocaleString("en-NG"); }

export default function BookingPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = use(params);
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ street: "", city: "", state: "Lagos", notes: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "transfer">("cash");
  const [promoCode, setPromoCode] = useState("");
  const [promoResult, setPromoResult] = useState<any>(null);

  useEffect(() => {
    getServiceById(serviceId).then(setService).catch(console.error);
  }, [serviceId]);

  const totalAmount = service
    ? (promoResult?.discount ? service.base_price - promoResult.discount : service.base_price)
    : 0;

  const canProceed = () => {
    if (step === 0) return address.street.trim() && address.city.trim();
    if (step === 1) return selectedDate && selectedTime;
    if (step === 2) return paymentMethod;
    return true;
  };

  const handleApplyPromo = async () => {
    if (!promoCode || !service) return;
    const result = await validatePromoCode(promoCode, service.base_price);
    setPromoResult(result);
    if (result.valid) toast.success(result.message);
    else toast.error(result.message);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const savedAddress = await saveAddress({
        street: address.street,
        city: address.city,
        state: address.state,
        label: "Booking address",
      });

      const timeMap: Record<string, string> = {
        "08:00 AM": "08:00", "09:00 AM": "09:00", "10:00 AM": "10:00",
        "11:00 AM": "11:00", "12:00 PM": "12:00", "02:00 PM": "14:00",
        "03:00 PM": "15:00", "04:00 PM": "16:00", "05:00 PM": "17:00",
      };

      await createBooking({
        service_id: serviceId,
        address_id: savedAddress.id,
        scheduled_date: selectedDate,
        scheduled_time: timeMap[selectedTime] || "10:00",
        total_amount: totalAmount,
        payment_method: paymentMethod,
        customer_notes: address.notes || undefined,
        promo_code_id: promoResult?.promoId,
        discount_amount: promoResult?.discount || 0,
      });

      toast.success("Booking confirmed!");
      router.push("/customer/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#1B3A6B] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f8fafc" }}>
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-6">
          <Link href="/services" className="hover:text-slate-600">Services</Link>
          <ChevronRight size={12} />
          <Link href={`/services/${serviceId}`} className="hover:text-slate-600">{service.name}</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600">Book</span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={i <= step ? { backgroundColor: "#1B3A6B", color: "white" } : { backgroundColor: "#e2e8f0", color: "#94a3b8" }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium ${i === step ? "text-slate-900" : "text-slate-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 mb-5" style={{ backgroundColor: i < step ? "#1B3A6B" : "#e2e8f0" }} />
              )}
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{service.emoji || "🔧"}</span>
            <div>
              <p className="text-sm font-bold text-slate-900">{service.name}</p>
              <p className="text-xs text-slate-400">{service.categories?.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-slate-900">{formatNaira(totalAmount)}</p>
            {promoResult?.valid && (
              <p className="text-xs text-green-600">-{formatNaira(promoResult.discount)} discount</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-6">
          {/* Step 0: Location */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <MapPin size={18} style={{ color: "#F97316" }} /> Where do you need the service?
              </h2>
              <p className="text-sm text-slate-500 mb-5">Enter the address where the professional should come.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">State</label>
                  <select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 bg-white">
                    {nigerianStates.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">City / Area</label>
                  <input type="text" placeholder="e.g. Lekki Phase 1" value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">Street address</label>
                  <input type="text" placeholder="e.g. 24 Admiralty Way" value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">Access notes <span className="text-slate-400 font-normal">(optional)</span></label>
                  <textarea placeholder="e.g. Gate code is 1234..." value={address.notes}
                    onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                    rows={3} className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Calendar size={18} style={{ color: "#F97316" }} /> Pick a date & time
              </h2>
              <p className="text-sm text-slate-500 mb-5">Choose when you&apos;d like the professional to arrive.</p>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">Date</label>
                  <input type="date" value={selectedDate} min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-3 flex items-center gap-1">
                    <Clock size={14} /> Preferred arrival time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className={`py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${selectedTime === t ? "text-white border-transparent" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                        style={selectedTime === t ? { backgroundColor: "#1B3A6B" } : {}}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <CreditCard size={18} style={{ color: "#F97316" }} /> Payment method
              </h2>
              <p className="text-sm text-slate-500 mb-5">How would you like to pay?</p>
              <div className="space-y-3 mb-6">
                {[
                  { id: "cash", label: "Cash on Arrival", desc: "Pay the professional when they arrive", icon: <Banknote size={20} /> },
                  { id: "card", label: "Debit / Credit Card", desc: "Pay securely online via Paystack", icon: <CreditCard size={20} /> },
                  { id: "transfer", label: "Bank Transfer", desc: "Transfer to our secure account", icon: <Building size={20} /> },
                ].map((method) => (
                  <button key={method.id} onClick={() => setPaymentMethod(method.id as any)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === method.id ? "border-[#1B3A6B] bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                    <span style={{ color: paymentMethod === method.id ? "#1B3A6B" : "#94a3b8" }}>{method.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{method.label}</p>
                      <p className="text-xs text-slate-500">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? "border-[#1B3A6B]" : "border-slate-300"}`}>
                      {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#1B3A6B" }} />}
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Promo code <span className="text-slate-400 font-normal">(optional)</span></label>
                <div className="flex gap-2">
                  <input type="text" placeholder="e.g. TASKAM10" value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2" />
                  <button onClick={handleApplyPromo} className="px-4 py-3 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#1B3A6B" }}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-5">Confirm your booking</h2>
              <div className="space-y-3">
                {[
                  { label: "Service", value: service.name },
                  { label: "Location", value: `${address.street}, ${address.city}, ${address.state}` },
                  { label: "Date", value: selectedDate },
                  { label: "Time", value: selectedTime },
                  { label: "Payment", value: paymentMethod === "cash" ? "Cash on Arrival" : paymentMethod === "card" ? "Card (Paystack)" : "Bank Transfer" },
                  ...(promoResult?.valid ? [{ label: "Discount", value: `-${formatNaira(promoResult.discount)}` }] : []),
                  { label: "Total", value: formatNaira(totalAmount), highlight: true },
                ].map((row: any) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500">{row.label}</span>
                    <span className={`text-sm font-semibold ${row.highlight ? "text-lg font-black text-slate-900" : "text-slate-800"} ${row.label === "Discount" ? "text-green-600" : ""}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)}
              className="flex-1 py-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Back
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleConfirm()}
            disabled={!canProceed() || loading}
            className="flex-1 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#F97316" }}
          >
            {loading ? "Confirming..." : step === 3 ? "Confirm Booking" : "Continue"}
          </button>
        </div>
      </main>
    </div>
  );
}
