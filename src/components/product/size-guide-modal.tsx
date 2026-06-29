import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 md:p-8 shrink-0">
              <h2 className="text-xl md:text-2xl font-light tracking-widest text-gray-900 uppercase">
                Größentabelle
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-black transition-all duration-500 hover:rotate-90 p-2 -mr-2 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" strokeWidth={1} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-6 md:px-8 pb-8 flex-1">
              {/* Table */}
              <div className="w-full overflow-x-auto mb-10">
                <table className="w-full min-w-[500px] text-sm text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 pr-4 font-medium text-gray-900 w-1/5">Größe</td>
                      <td className="py-4 px-4 text-gray-600">36</td>
                      <td className="py-4 px-4 text-gray-600">38</td>
                      <td className="py-4 px-4 text-gray-600">40</td>
                      <td className="py-4 px-4 text-gray-600">42</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 pr-4 font-medium text-gray-900">Taille</td>
                      <td className="py-4 px-4 text-gray-600">36</td>
                      <td className="py-4 px-4 text-gray-600">38.5</td>
                      <td className="py-4 px-4 text-gray-600">41</td>
                      <td className="py-4 px-4 text-gray-600">43.5</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 pr-4 font-medium text-gray-900">Hüfte</td>
                      <td className="py-4 px-4 text-gray-600">62</td>
                      <td className="py-4 px-4 text-gray-600">64.5</td>
                      <td className="py-4 px-4 text-gray-600">67</td>
                      <td className="py-4 px-4 text-gray-600">69.5</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 pr-4 font-medium text-gray-900">Innenbeinlänge</td>
                      <td className="py-4 px-4 text-gray-600">76</td>
                      <td className="py-4 px-4 text-gray-600">77</td>
                      <td className="py-4 px-4 text-gray-600">78</td>
                      <td className="py-4 px-4 text-gray-600">79</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 pr-4 font-medium text-gray-900">Außenbeinlänge</td>
                      <td className="py-4 px-4 text-gray-600">102</td>
                      <td className="py-4 px-4 text-gray-600">104</td>
                      <td className="py-4 px-4 text-gray-600">106</td>
                      <td className="py-4 px-4 text-gray-600">108</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Descriptions */}
              <div className="space-y-2 text-sm text-gray-700 leading-relaxed max-w-3xl">
                <p><strong className="text-gray-900 font-medium">Schultern:</strong> Von einem Schulterende zum anderen über den Rücken gemessen.</p>
                <p><strong className="text-gray-900 font-medium">Brust:</strong> An der breitesten Stelle der Brust gemessen, direkt unter den Achseln.</p>
                <p><strong className="text-gray-900 font-medium">Taille:</strong> Um die natürliche Taille gemessen, normalerweise über dem Bauchnabel.</p>
                <p><strong className="text-gray-900 font-medium">Hüfte:</strong> Um die breiteste Stelle der Hüfte und des Gesäßes gemessen.</p>
                <p><strong className="text-gray-900 font-medium">Länge:</strong> Vom höchsten Punkt der Schulter nahe dem Hals bis zum unteren Rand des Kleidungsstücks gemessen.</p>
                <p><strong className="text-gray-900 font-medium">Ärmellänge:</strong> Von der Schulternaht bis zum Ende des Bündchens gemessen.</p>
                <p><strong className="text-gray-900 font-medium">Innenbeinlänge:</strong> Vom Schritt bis zum unteren Ende des Beins gemessen.</p>
                <p><strong className="text-gray-900 font-medium">Außenbeinlänge:</strong> Von der Taille bis zum unteren Ende des Beins gemessen.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
