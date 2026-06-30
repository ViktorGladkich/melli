import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen pt-[120px] pb-24 px-6 md:px-12 bg-white text-black">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-black transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Zurück zum Shop
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-light mb-8 uppercase tracking-widest text-black">Impressum</h1>
        
        <div className="prose prose-sm md:prose-base max-w-none text-neutral-800 space-y-6">
          <p>
            <strong>Angaben gemäß § 5 TMG:</strong><br />
            MILLY Modest Fashion<br />
            Musterstraße 123<br />
            10115 Berlin<br />
            Deutschland
          </p>

          <p>
            <strong>Vertreten durch:</strong><br />
            Max Mustermann
          </p>

          <p>
            <strong>Kontakt:</strong><br />
            Telefon: +49 (0) 123 44 55 66<br />
            E-Mail: info@milly.de
          </p>

          <p>
            <strong>Umsatzsteuer-ID:</strong><br />
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            DE 123456789
          </p>

          <p className="text-sm mt-12 text-neutral-500">
            *Dies ist ein Platzhalter-Impressum. Bitte ersetzen Sie diese Daten durch Ihre echten Unternehmensdaten.*
          </p>
        </div>
      </div>
    </div>
  );
}
