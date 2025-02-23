import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SiSalesforce, SiJavascript, SiReact } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

export default function Hero() {
  const { toast } = useToast();

  const handlePortfolioClick = async () => {
    try {
      const response = await fetch('/api/resume');
      if (!response.ok) throw new Error('Failed to fetch resume');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Saransh_Batham_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-[#0A1A2F] via-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
              Saransh Batham
            </span>
          </h1>
          <h2 className="text-2xl mb-6 text-muted-foreground">
            Salesforce Developer at Infosys
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Specialized in Salesforce development, full-stack web applications, and cloud solutions
          </p>
          <div className="flex gap-4 mb-8">
            <SiSalesforce className="w-8 h-8 text-[#00A1E0]" />
            <SiJavascript className="w-8 h-8 text-[#F7DF1E]" />
            <SiReact className="w-8 h-8 text-[#61DAFB]" />
          </div>
          <div className="space-x-4">
            <Button size="lg" className="bg-[#0A1A2F] hover:bg-[#1E3A8A]" onClick={handlePortfolioClick}>
              Download Resume
            </Button>
            <a href="mailto:Saranshbatham21@gmail.com">
              <Button variant="outline" size="lg" className="border-[#0A1A2F] text-[#0A1A2F] hover:bg-[#0A1A2F]/10">
                Contact Me
              </Button>
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[500px] hidden md:block"
        >
          <img 
            src="/images/Saransh Pic-min.jpg"
            alt="Saransh Batham"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1A2F]/20 via-[#1E3A8A]/20 to-[#3B82F6]/20 rounded-2xl" />
        </motion.div>
      </div>
    </section>
  );
}