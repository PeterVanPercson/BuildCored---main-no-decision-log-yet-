import { useRef } from "react";
import ScrollArrow from "@/components/ScrollArrow";
import backgroundPattern from "@/assets/background-pattern.svg";

const Index = () => {
  const secondSectionRef = useRef<HTMLElement>(null);

  const scrollToSecondSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory relative">
      {/* Hero Section */}
      <section className="h-screen snap-start flex flex-col relative shrink-0">
        {/* Center Text */}
        <div className="flex-1 flex items-center justify-center px-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-center max-w-4xl leading-tight tracking-tight">
            <span className="text-muted-foreground">open source for</span>
            <br />
            <span className="text-foreground font-medium">
              creative engineering
            </span>
          </h1>
        </div>

        {/* Scroll Arrow - Bottom Center */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <ScrollArrow onClick={scrollToSecondSection} />
        </div>
      </section>

      {/* About Section */}
      <section
        ref={secondSectionRef}
        className="h-screen relative snap-start flex flex-col shrink-0"
      >
        <div
          className="absolute top-4 h-[100vh] inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url(${backgroundPattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(3px)",
          }}
        />
        {/* Center Paragraph */}
        <div className="flex-1 flex items-center flex-col lg:space-y-8 space-y-6 justify-center px-6 md:px-12">
          <p className="text-lg md:text-3xl lg:text-5xl lg:leading-[120%] text-foreground text-center max-w-3xl lg:max-w-4xl leading-relaxed font-light">
            An open-source platform for sharing creative engineering solutions
            across disciplines (code algorithms, 3D designs, AI models, MATLAB
            scripts, CAD drawings, robotics projects, and so on).
          </p>
          <h3 className="uppercase font-bold tracking-wide text-md md:text-xl lg:text-3xl">
            Coming Soon...
          </h3>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full px-4">
          <form
            action="https://buttondown.com/api/emails/embed-subscribe/buildcored"
            method="post"
            target="popupwindow"
            className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full px-5 py-2 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
            >
              Apply
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Index;
