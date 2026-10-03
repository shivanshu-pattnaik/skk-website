import About from "@/components/About";
import Contact from "@/components/Contact";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Guru from "@/components/Guru";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Guru />
      <Events />
      <Gallery />
      <Contact />
    </>
  );
}
