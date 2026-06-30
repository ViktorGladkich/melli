import { motion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-text";

const transitionProps = { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const };

interface CartShippingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
  setCountry: (country: string) => void;
  zip: string;
  setZip: (zip: string) => void;
  showRate: boolean;
  setShowRate: (show: boolean) => void;
}

export function CartShippingOverlay({ 
  isOpen, 
  onClose,
  country,
  setCountry,
  zip,
  setZip,
  showRate,
  setShowRate
}: CartShippingOverlayProps) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={transitionProps}
      className="absolute inset-0 z-20 bg-white flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0">
        <h2 className="text-[13px] font-medium tracking-widest uppercase">Versand</h2>
        <button onClick={onClose} className="p-2 -m-2 text-gray-500 hover:text-black cursor-pointer group">
          <X className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1} />
        </button>
      </div>
      
      <div className="p-6 flex flex-col gap-6 overflow-y-auto">
        {showRate && (
          <div className="bg-[#e9f2e3] p-4 text-sm text-[#3d5a35]">
            <p className="mb-2">Es gibt einen Versandtarif für dieses Ziel:</p>
            <ul className="list-disc pl-5">
              <li>Standard: {country === "Deutschland" ? "4,99 €" : "9,99 €"}</li>
            </ul>
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <label className="text-sm">Land/Region</label>
          <div className="relative">
            <select 
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setShowRate(false); // reset when country changes
              }}
              className="w-full border border-gray-300 rounded-none pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-black cursor-pointer bg-white appearance-none"
            >
              <option value="Deutschland">Deutschland</option>
              <option value="Österreich">Österreich</option>
              <option value="Schweiz">Schweiz</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Postleitzahl</label>
          <input 
            type="text" 
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="border border-gray-300 rounded-none px-4 py-3 text-[16px] md:text-sm focus:outline-none focus:border-black"
          />
        </div>

        <button 
          onClick={() => setShowRate(true)}
          className="bg-[#222] text-white h-[50px] px-8 w-max text-[14px] font-medium transition-colors hover:bg-black flex items-center justify-center group cursor-pointer"
        >
          <AnimatedText text="Berechnen" />
        </button>
      </div>
    </motion.div>
  );
}

interface CartDiscountOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  setCode: (code: string) => void;
  error: boolean;
  setError: (error: boolean) => void;
  applied: boolean;
  setApplied: (applied: boolean) => void;
}

export function CartDiscountOverlay({
  isOpen,
  onClose,
  code,
  setCode,
  error,
  setError,
  applied,
  setApplied
}: CartDiscountOverlayProps) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={transitionProps}
      className="absolute inset-0 z-20 bg-white flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0">
        <h2 className="text-[13px] font-medium tracking-widest uppercase">RABATTCODE</h2>
        <button onClick={onClose} className="p-2 -m-2 text-gray-500 hover:text-black cursor-pointer group">
          <X className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1} />
        </button>
      </div>
      
      <div className="p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <input 
            type="text" 
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            className="border border-gray-300 rounded-none px-4 py-3 text-[16px] md:text-sm focus:outline-none focus:border-black"
          />
          
          {error && (
            <div className="bg-[#fff0f0] p-4 text-sm text-[#d0021b]">
              Rabattcode ist ungültig oder gilt nicht für diesen Warenkorb.
            </div>
          )}

          {applied && (
            <div className="bg-[#e9f2e3] p-4 text-sm text-[#3d5a35]">
              Rabattcode erfolgreich angewendet!
            </div>
          )}
        </div>

        <button 
          onClick={() => {
            if (code.trim().toUpperCase() === "SALE10") {
              setApplied(true);
              setError(false);
            } else {
              setError(true);
              setApplied(false);
            }
          }}
          className="bg-[#222] text-white h-[50px] px-8 w-max text-[14px] font-medium transition-colors hover:bg-black flex items-center justify-center group cursor-pointer"
        >
          <AnimatedText text="Anwenden" />
        </button>
      </div>
    </motion.div>
  );
}

interface CartNoteOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  note: string;
  setNote: (note: string) => void;
}

export function CartNoteOverlay({
  isOpen,
  onClose,
  note,
  setNote
}: CartNoteOverlayProps) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={transitionProps}
      className="absolute inset-0 z-20 bg-white flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0">
        <h2 className="text-[13px] font-medium tracking-widest uppercase">BESTELLNOTIZ HINZUFÜGEN</h2>
        <button onClick={onClose} className="p-2 -m-2 text-gray-500 hover:text-black cursor-pointer group">
          <X className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1} />
        </button>
      </div>
      
      <div className="p-6 flex flex-col gap-6 overflow-y-auto">
        <textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Wie können wir dir helfen?"
          className="border border-gray-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-black min-h-[120px] resize-y"
        />

        <button 
          onClick={onClose}
          className="bg-[#222] text-white h-[50px] px-8 w-max text-[14px] font-medium transition-colors hover:bg-black flex items-center justify-center group cursor-pointer"
        >
          <AnimatedText text="Speichern" />
        </button>
      </div>
    </motion.div>
  );
}
