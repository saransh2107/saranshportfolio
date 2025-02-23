import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#0A1A2F] via-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
            Creative Developer & Designer
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Crafting beautiful digital experiences with modern web technologies
          </p>
          <div className="space-x-4">
            <Link href="/portfolio">
              <Button size="lg" className="bg-[#0A1A2F] hover:bg-[#1E3A8A]">View Portfolio</Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" className="border-[#0A1A2F] text-[#0A1A2F] hover:bg-[#0A1A2F]/10">Read Blog</Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[500px] hidden md:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1A2F]/20 via-[#1E3A8A]/20 to-[#3B82F6]/20 rounded-2xl" />
        </motion.div>
      </div>
    </section>
  );
}