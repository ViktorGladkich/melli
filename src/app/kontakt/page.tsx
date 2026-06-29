import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: 'Kontakt | MILLY',
  description: 'Nehmen Sie Kontakt mit uns auf. Wir helfen Ihnen gerne weiter.',
};

export default function ContactPage() {
  return (
    <div className="w-full flex-1 flex flex-col bg-[#F6F6F6] min-h-[70vh] items-center justify-center py-20 px-4">
      <div className="w-full max-w-[800px] mx-auto text-center mb-10">
        <h1 className="text-2xl md:text-[28px] font-normal uppercase tracking-wide mb-4 text-[#222]">
          Brauchen Sie Hilfe? Kontaktieren Sie uns.
        </h1>
        <p className="text-gray-800 text-[15px] md:text-base font-normal">
          Kontaktieren Sie einen unserer Experten und wir melden uns so schnell wie möglich bei Ihnen.
        </p>
      </div>
      
      <div className="w-full max-w-[750px] mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}
