import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WiderrufsbelehrungPage() {
  return (
    <div className="min-h-screen pt-[120px] pb-24 px-6 md:px-12 bg-white text-black">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-black transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Zurück zum Shop
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-light mb-8 uppercase tracking-widest text-black">Widerrufsbelehrung</h1>
        
        <div className="prose prose-sm md:prose-base max-w-none text-neutral-800 space-y-6">
          <h3 className="text-lg font-medium text-black">Widerrufsrecht</h3>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
          </p>

          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (MILLY, Musterstraße 123, 10115 Berlin, E-Mail: info@milly.de) mittels einer eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
          </p>

          <h3 className="text-lg font-medium text-black mt-8">Folgen des Widerrufs</h3>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
          </p>

          <p className="text-sm mt-12 text-neutral-500">
            *Dies ist eine Platzhalter-Widerrufsbelehrung. Bitte passen Sie diese entsprechend an.*
          </p>
        </div>
      </div>
    </div>
  );
}
