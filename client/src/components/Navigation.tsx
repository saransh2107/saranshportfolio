import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center">
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="relative px-6 py-2 text-sm font-medium transition-colors hover:text-primary">
                  {location === item.href && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute inset-0 bg-primary/10 rounded-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
