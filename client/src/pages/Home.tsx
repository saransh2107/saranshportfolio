import Hero from "@/components/Hero";
import About from "@/components/About";
import BlogList from "@/components/BlogList";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="space-y-20">
      <Hero />
      <About />
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Posts</h2>
        <BlogList limit={3} />
      </section>
      <Contact />
    </div>
  );
}