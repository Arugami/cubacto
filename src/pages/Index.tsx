import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowToBuy from "@/components/HowToBuy";
import Community from "@/components/Community";
import Vision from "@/components/Vision";
import Footer from "@/components/Footer";
import ContinuousSlider from "@/components/ContinuousSlider";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ContinuousSlider />
      <About />
      <HowToBuy />
      <Community />
      <Vision />
      <Footer />
    </div>
  );
};

export default Index;