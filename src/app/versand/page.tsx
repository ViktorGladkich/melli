import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function VersandPage() {
  return (
    <div className="min-h-screen pt-[120px] pb-24 px-6 md:px-12 bg-white text-black">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-black transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Zurück zum Shop
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-light mb-8 uppercase tracking-widest text-black">Versand & Lieferung</h1>
        
        <div className="prose prose-sm md:prose-base max-w-none text-neutral-800 space-y-6">
          <h3 className="text-lg font-medium text-black">Versandkosten</h3>
          <p>
            Wir versenden unsere Produkte mit DHL. Die Versandkosten werden Ihnen im Warenkorbsystem und auf der Bestellseite nochmals deutlich mitgeteilt.
          </p>
          <ul className="list-disc pl-5">
            <li><strong>Deutschland:</strong> 4,99 € (Kostenlos ab 100 € Bestellwert)</li>
            <li><strong>EU-Ausland:</strong> 12,99 €</li>
            <li><strong>International:</strong> 24,99 €</li>
          </ul>

          <h3 className="text-lg font-medium text-black mt-8">Lieferzeiten</h3>
          <p>
            Soweit im jeweiligen Angebot keine andere Frist angegeben ist, erfolgt die Lieferung der Ware im Inland (Deutschland) innerhalb von 2-4 Tagen, bei Auslandslieferungen innerhalb von 5-7 Tagen nach Vertragsschluss (bei vereinbarter Vorauszahlung nach dem Zeitpunkt Ihrer Zahlungsanweisung).
          </p>
          <p>
            Bitte beachten Sie, dass an Sonn- und Feiertagen keine Zustellung erfolgt.
          </p>

          <p className="text-sm mt-12 text-neutral-500">
            *Dies ist ein Platzhalter-Text. Bitte passen Sie die Versandkosten und -zeiten entsprechend an.*
          </p>
        </div>
      </div>
    </div>
  );
}
