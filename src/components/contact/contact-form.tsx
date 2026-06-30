"use client";

import { useState } from "react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
      }, 5000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-white border border-gray-200 animate-in fade-in duration-700">
        <h3 className="text-xl font-normal uppercase tracking-widest mb-2">Vielen Dank!</h3>
        <p className="text-gray-600 font-light">
          Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns so schnell wie möglich bei Ihnen melden.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 border border-[#E5E5E5] bg-white focus:outline-none focus:border-gray-400 transition-colors text-[16px] md:text-[15px] text-gray-800 placeholder:text-gray-500"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-3 border border-[#E5E5E5] bg-white focus:outline-none focus:border-gray-400 transition-colors text-[16px] md:text-[15px] text-gray-800 placeholder:text-gray-500"
            placeholder="Telefonnummer"
          />
        </div>
      </div>
      
      <div>
        <input
          type="email"
          id="email"
          required
          className="w-full px-4 py-3 border border-[#E5E5E5] bg-white focus:outline-none focus:border-gray-400 transition-colors text-[16px] md:text-[15px] text-gray-800 placeholder:text-gray-500"
          placeholder="E-Mail*"
        />
      </div>

      <div>
        <textarea
          id="message"
          required
          rows={7}
          className="w-full px-4 py-3 border border-[#E5E5E5] bg-white focus:outline-none focus:border-gray-400 transition-colors text-[16px] md:text-[15px] text-gray-800 placeholder:text-gray-500 resize-none"
          placeholder="Nachricht"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#222] text-white px-10 py-3 text-[15px] font-normal hover:bg-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Wird gesendet..." : "Senden"}
        </button>
      </div>
    </form>
  );
}
