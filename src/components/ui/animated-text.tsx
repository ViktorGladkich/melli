import React from "react";
import { cn } from "@/lib/utils";

export function AnimatedText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("relative overflow-hidden inline-flex items-center justify-center", className)}>
      <span className="transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] translate-y-full group-hover:translate-y-0">
        {text}
      </span>
    </span>
  );
}
