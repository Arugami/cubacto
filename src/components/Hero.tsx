import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-[#222226] overflow-hidden flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0 mt-24 lg:mt-0">
        {/* Left side content */}
        <div className="w-full lg:w-3/5 text-left space-y-6 lg:space-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight">
            <span className="text-white">THE ONLY</span>
            <br />
            <span className="text-cuba-red">OFFICIAL</span>
            <br />
            <span className="text-white">CUBA MEME</span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 max-w-2xl">
            Join the Revolution. The First Ever Country Takeover!
          </p>

          {/* Image shown on mobile only */}
          <div className="block lg:hidden w-full px-4 sm:px-8 py-6">
            <img 
              src="/lovable-uploads/ac63db1b-a80e-4ac4-ae92-d8513c944579.png" 
              alt="Hand holding Cuban flag" 
              className="w-full h-auto max-w-md mx-auto object-contain transform -rotate-12 hover:rotate-0 transition-transform duration-500"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6">
            <Button
              size="lg"
              className="bg-cuba-red hover:bg-cuba-red/90 text-white text-lg sm:text-xl px-6 sm:px-8 py-6 rounded-full w-full sm:w-auto"
              asChild
            >
              <a href="https://raydium.io" target="_blank" rel="noopener noreferrer">
                Buy $CUBA Now
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-cuba-blue hover:bg-cuba-blue/90 text-white text-lg sm:text-xl px-6 sm:px-8 py-6 rounded-full w-full sm:w-auto"
              asChild
            >
              <a href="https://t.me/cubacoin" target="_blank" rel="noopener noreferrer">
                Join Community
              </a>
            </Button>
          </div>
        </div>

        {/* Right side - Image (desktop only) */}
        <div className="hidden lg:block w-2/5">
          <img 
            src="/lovable-uploads/ac63db1b-a80e-4ac4-ae92-d8513c944579.png" 
            alt="Hand holding Cuban flag" 
            className="w-full h-auto object-contain transform -rotate-12 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 right-8">
        <p className="text-white/60 italic text-lg sm:text-xl">
          "Make Cuba Great Again"
        </p>
      </div>
    </section>
  );
};

export default Hero;