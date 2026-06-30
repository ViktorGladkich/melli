import { AnimatedText } from "@/components/ui/animated-text";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RetourenPage() {
  return (
    <div className="min-h-screen pt-[120px] pb-24 px-6 md:px-12 bg-white text-black">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-black transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Zurück zum Shop
        </Link>
        
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-light mb-4 uppercase tracking-widest text-black">Retouren & Umtausch</h1>
          <p className="text-neutral-600 leading-relaxed max-w-2xl text-[15px]">
            Wir möchten, dass Sie Ihre Artikel lieben. Falls Sie mit Ihrem Kauf nicht vollständig zufrieden sind, haben Sie 14 Tage Zeit, um ihn an uns zurückzusenden.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-medium mb-4 uppercase tracking-wide text-black">Wie melde ich eine Retoure an?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-medium mb-4 text-sm">1</div>
                <h3 className="font-medium mb-2 text-sm uppercase tracking-wide text-black">Anmelden</h3>
                <p className="text-sm text-neutral-600">Nutzen Sie unser Retourenportal oder kontaktieren Sie den Support mit Ihrer Bestellnummer.</p>
              </div>
              <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-medium mb-4 text-sm">2</div>
                <h3 className="font-medium mb-2 text-sm uppercase tracking-wide text-black">Verpacken</h3>
                <p className="text-sm text-neutral-600">Legen Sie den Artikel im Originalzustand (ungetragen, mit Etiketten) zurück in das Paket.</p>
              </div>
              <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-medium mb-4 text-sm">3</div>
                <h3 className="font-medium mb-2 text-sm uppercase tracking-wide text-black">Versenden</h3>
                <p className="text-sm text-neutral-600">Kleben Sie das Rücksendeetikett auf das Paket und bringen Sie es zum nächsten Paketshop.</p>
              </div>
            </div>
          </section>

          <section className="prose prose-sm md:prose-base max-w-none text-neutral-800">
            <h2 className="text-xl font-medium mb-4 text-black uppercase tracking-wide">Wichtige Hinweise</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Die Artikel müssen ungetragen, ungewaschen und im Originalzustand mit allen Etiketten sein.</li>
              <li>Personalisierte Artikel sind vom Umtausch ausgeschlossen.</li>
              <li>Die Rückerstattung erfolgt innerhalb von 7-10 Werktagen nach Erhalt und Prüfung der Retoure auf die ursprüngliche Zahlungsmethode.</li>
              <li>Wir tragen die Kosten für Rücksendungen innerhalb Deutschlands. Bei internationalen Rücksendungen trägt der Käufer die Versandkosten.</li>
            </ul>
          </section>
        </div>

        <div className="mt-16 bg-neutral-50 p-8 text-center rounded-sm border border-neutral-100">
          <h3 className="text-lg font-medium mb-2 text-black">Retoure jetzt starten</h3>
          <p className="text-sm text-neutral-600 mb-6">Sie benötigen Ihre Bestellnummer und die E-Mail-Adresse.</p>
          <button className="bg-black text-white px-8 py-3.5 text-sm font-medium transition-colors hover:bg-black/90 group uppercase tracking-widest min-w-[200px]">
            <AnimatedText text="Zum Retourenportal" />
          </button>
        </div>
      </div>
    </div>
  );
}
