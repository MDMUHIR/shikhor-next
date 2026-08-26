import { useState } from 'react';
import type React from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Lock, Smartphone, ArrowRight } from 'lucide-react';
import { Course, ProductItem } from '../types';


interface PaymentModalProps {
  item: Course | ProductItem;
  discountCode?: string;
  onClose: () => void;
  onPaymentSuccess: (itemId: string) => void;
}

export default function PaymentModal({
  item,
  discountCode,
  onClose,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'card'>('bkash');
  const [accountNumber, setAccountNumber] = useState('01712345678');
  const [trxId, setTrxId] = useState('TRX984210');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const price = 'price' in item ? item.price : 0;
  const discountAmount = discountCode ? 500 : 0;
  const finalPayable = Math.max(0, price - discountAmount);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(item.id);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Enrollment Successful!
            </h3>
            <p className="text-sm text-slate-600">
              You are now officially enrolled in <strong>{item.title}</strong>. Welcome to Redwan&apos;s Method!
            </p>
            <p className="text-xs text-slate-400">
              Redirecting to your student learning dashboard...
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="bg-slate-900 text-white p-6">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  SSLCommerz 256-Bit Encrypted
                </span>
              </div>
              <h2 className="text-xl font-bold text-white line-clamp-1">
                {item.title}
              </h2>
              <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400">Total Payable Amount:</span>
                <span className="text-2xl font-black text-amber-400">
                  ৳{finalPayable.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Payment Gateway
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'bkash'
                        ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-300'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-black text-pink-600">bKash</span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'nagad'
                        ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-300'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-black text-orange-600">Nagad</span>
                  </button>

                  {/* Rocket */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('rocket')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'rocket'
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-300'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-black text-purple-600">Rocket</span>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="text-[11px] font-bold text-blue-600">Cards</span>
                  </button>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {paymentMethod === 'card' ? 'Card Number' : `${paymentMethod.toUpperCase()} Account Number`}
                  </label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder={paymentMethod === 'card' ? '4111 2222 3333 4444' : '017XXXXXXXX'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold text-slate-800"
                  />
                </div>

                {paymentMethod !== 'card' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Transaction ID (TrxID) / PIN
                    </label>
                    <input
                      type="text"
                      required
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="e.g. 9J182KAS"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold text-slate-800 uppercase"
                    />
                  </div>
                )}

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Instant automated batch enrollment upon verification.</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <>
                      <span>Pay ৳{finalPayable.toLocaleString()} &amp; Confirm</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
