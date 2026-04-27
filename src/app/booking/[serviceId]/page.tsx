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

const inputStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

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
      toast.success("Booking confirmed! 🎉");
      router.push("/customer/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-gradient)" }}>
      <div className="w-8 h-8 rounded-full animate-spin" style={{ border: "2px solid rgba(249,115,22,0.3)", borderTop: "2px solid #F97316" }} />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-gradient)" }}>
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 pb-28">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <ChevronRight size={12} />
          <Link href={`/services/${serviceId}`} className="hover:text-white transition-colors">{service.name}</Link>
          <ChevronRight size={12} />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Book</span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={i <= step
                    ? { background: "linear-gradient(135deg, #F97316, #ea6c00)", color: "white" }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="text-xs mt-1 font-medium hidden sm:block"
                  style={{ color: i === step ? "white" : "rgba(255,255,255,0.3)" }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px mx-2 mb-4 sm:mb-5"
                  style={{ background: i < step ? "linear-gradient(90deg, #F97316, #ea6c00)" : "rgba(255,255,255,0.1)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="glass-card rounded-2xl p-4 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{service.emoji || "🔧"}</span>
            <div>
              <p className="text-sm font-bold text-white">{service.name}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{service.categories?.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-white">{formatNaira(totalAmount)}</p>
            {promoResult?.valid && (
              <p className="text-xs text-green-400">-{formatNaira(promoResult.discount)}</p>
            )}
          </div>
        </div>

        {/* Step content */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-5">

          {/* Step 0: Location */}
          {step === 0 && (
            <div>
              <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <MapPin size={16} style={{ color: "#F97316" }} /> Where do you need the service?
              </h2>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Enter the address where the professional should come.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>State</label>
                  <select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none text-white"
                    style={inputStyle}>
                    {nigerianStates.map((s) => <option key={s} style={{ background: "#0a1020" }}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>City / Area</label>
                  <input type="text" placeholder="e.g. Lekki Phase 1" value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none text-white placeholder-white/25"
                    style={inputStyle} />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>Street address</label>
                  <input type="text" placeholder="e.g. 24 Admiralty Way" value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none text-white placeholder-white/25"
                    style={inputStyle} />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Access notes <span className="font-normal" style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span>
                  </label>
                  <textarea placeholder="e.g. Gate code is 1234..." value={address.notes}
                    onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                    rows={3} className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none text-white placeholder-white/25 resize-none"
                    style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div>
              <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <Calendar size={16} style={{ color: "#F97316" }} /> Pick a date & time
              </h2>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Choose when you&apos;d like the professional to arrive.</p>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>Date</label>
                  <input type="date" value={selectedDate} min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none text-white"
                    style={inputStyle} />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <Clock size={12} className="inline mr-1" />Preferred arrival time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className="py-2.5 rounded-xl text-xs font-semibold transition-all"
                        style={selectedTime === t
                          ? { background: "linear-gradient(135deg, #F97316, #ea6c00)", color: "white", border: "1px solid transparent" }
                          : { ...inputStyle, color: "rgba(255,255,255,0.6)" }}>
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
              <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <CreditCard size={16} style={{ color: "#F97316" }} /> Payment method
              </h2>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>How would you like to pay?</p>
              <div className="space-y-3 mb-6">
                {[
                  { id: "cash",     label: "Cash on Arrival",     desc: "Pay the professional when they arrive", icon: <Banknote size={18} /> },
                  { id: "card",     label: "Debit / Credit Card", desc: "Pay securely online via Paystack",      icon: <CreditCard size={18} /> },
                  { id: "transfer", label: "Bank Transfer",        desc: "Transfer to our secure account",       icon: <Building size={18} /> },
                ].map((method) => (
                  <button key={method.id} onClick={() => setPaymentMethod(method.id as any)}
                    className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                    style={paymentMethod === method.id
                      ? { background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.4)" }
                      : { ...inputStyle }}>
                    <span style={{ color: paymentMethod === method.id ? "#F97316" : "rgba(255,255,255,0.3)" }}>{method.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{method.label}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{method.desc}</p>
                    </div>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ border: `2px solid ${paymentMethod === method.id ? "#F97316" : "rgba(255,255,255,0.2)"}` }}>
                      {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Promo code <span className="font-normal" style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span>
                </label>
                <div className="flex gap-2">
                  <input type="text" placeholder="e.g. TASKAM10" value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 rounded-xl py-3 px-4 text-sm focus:outline-none text-white placeholder-white/25"
                    style={inputStyle} />
                  <button onClick={handleApplyPromo}
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)" }}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <h2 className="text-base font-bold text-white mb-5">Confirm your booking</h2>
              <div className="space-y-3">
                {[
                  { label: "Service",  value: service.name },
                  { label: "Location", value: `${address.street}, ${address.city}, ${address.state}` },
                  { label: "Date",     value: selectedDate },
                  { label: "Time",     value: selectedTime },
                  { label: "Payment",  value: paymentMethod === "cash" ? "💵 Cash on Arrival" : paymentMethod === "card" ? "💳 Card (Paystack)" : "🏦 Bank Transfer" },
                  ...(promoResult?.valid ? [{ label: "Discount", value: `-${formatNaira(promoResult.discount)}`, green: true }] : []),
                  { label: "Total",    value: formatNaira(totalAmount), highlight: true },
                ].map((row: any) => (
                  <div key={row.label} className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{row.label}</span>
                    <span className={`text-sm font-semibold ${row.highlight ? "text-lg font-black text-white" : ""} ${row.green ? "text-green-400" : "text-white"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)}
              className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
              Back
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleConfirm()}
            disabled={!canProceed() || loading}
            className="flex-1 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}>
            {loading ? "Confirming..." : step === 3 ? "Confirm Booking 🎉" : "Continue →"}
          </button>
        </div>
      </main>
    </div>
  );
}
