"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";
import { motion } from "framer-motion";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function FAQPage() {
  const faqs = [
    {
      question: "Wie lange dauert der Versand?",
      answer: "Der Standardversand innerhalb Deutschlands dauert in der Regel 2-4 Werktage. Express-Lieferungen erreichen Sie innerhalb von 1-2 Werktagen."
    },
    {
      question: "Welche Zahlungsmethoden werden akzeptiert?",
      answer: "Wir akzeptieren PayPal, Kreditkarten (Visa, MasterCard, American Express), Apple Pay, Google Pay und Klarna (Rechnung & Ratenkauf)."
    },
    {
      question: "Kann ich meine Bestellung stornieren oder ändern?",
      answer: "Solange Ihre Bestellung noch nicht versandt wurde, können wir diese stornieren oder ändern. Bitte kontaktieren Sie unseren Kundenservice so schnell wie möglich."
    },
    {
      question: "Wie pflege ich meine Produkte am besten?",
      answer: "Jedes unserer Produkte wird mit spezifischen Pflegehinweisen geliefert. Wir empfehlen grundsätzlich schonende Handwäsche oder Kaltwäsche für empfindliche Stoffe."
    },
    {
      question: "Wo werden die Produkte hergestellt?",
      answer: "Unsere Kollektionen werden unter fairen Bedingungen und mit höchsten Qualitätsstandards in ausgewählten Manufakturen in Europa gefertigt."
    },
    {
      question: "Gibt es einen Größenguide?",
      answer: "Ja, Sie finden auf jeder Produktseite einen detaillierten Größenguide. Unsere Abayas haben in der Regel eine Einheitsgröße (One Size) oder sind nach Längen gestaffelt."
    },
    {
      question: "Kann ich Artikel umtauschen?",
      answer: "Ein direkter Umtausch ist leider nicht möglich. Bitte senden Sie den unerwünschten Artikel als Retoure an uns zurück und geben Sie bequem eine neue Bestellung auf."
    },
    {
      question: "Bieten Sie auch internationale Lieferungen an?",
      answer: "Ja, wir liefern weltweit. Die genauen Versandkosten und Lieferzeiten für Ihr Land werden beim Checkout im Warenkorb berechnet."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="pt-[120px] pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-light mb-4 uppercase tracking-widest text-black">FAQ</h1>
          <p className="text-neutral-600 text-sm md:text-base">Häufig gestellte Fragen</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-neutral-200">
                <AccordionTrigger className="py-6 text-left text-[15px] hover:no-underline font-medium uppercase tracking-wide text-black cursor-pointer group">
                  <span className="group-hover:text-neutral-600 transition-colors">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-800 text-[15px] leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center bg-neutral-50 p-8 rounded-sm border border-neutral-100"
        >
          <h3 className="text-lg font-medium mb-2 text-black">Noch Fragen?</h3>
          <p className="text-sm text-neutral-600 mb-6">Unser Kundenservice hilft Ihnen gerne weiter.</p>
          <Link href="/kontakt" className="inline-flex items-center justify-center bg-black text-white px-8 py-3.5 text-sm font-medium transition-colors hover:bg-black/90 group uppercase tracking-widest min-w-[200px]">
            <AnimatedText text="Kontaktieren Sie uns" />
          </Link>
        </motion.div>
      </div>
      <NewsletterSection />
    </div>
  );
}
