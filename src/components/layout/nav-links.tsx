"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "Clothing", href: "/collections/clothing" },
  { name: "Bags", href: "/collections/bags" },
  { name: "Sale", href: "/collections/sale" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "text-sm font-semibold uppercase tracking-wider transition-opacity relative group",
              isActive ? "opacity-100" : "hover:opacity-70"
            )}
          >
            {link.name}
            <span 
              className={cn(
                "absolute -bottom-1 left-0 h-px bg-current transition-all duration-300",
                isActive ? "w-full" : "w-0 group-hover:w-full"
              )} 
            />
          </Link>
        );
      })}
    </nav>
  );
}
