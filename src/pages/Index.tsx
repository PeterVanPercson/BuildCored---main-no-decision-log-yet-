import { useRef } from "react";
import Logo from "@/components/Logo";
import ScrollArrow from "@/components/ScrollArrow";
import buildcoredLogo from "@/assets/buildcored-logo.jpg";
import backgroundPattern from "@/assets/background-pattern.svg";

const Index = () => {
  const secondSectionRef = useRef<HTMLElement>(null);

  const scrollToSecondSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory relative">
      {/* Background Pattern */}
      {/* Hero Section */}
      <section className="h-screen snap-start flex flex-col relative shrink-0">
        {/* Logo - Top Left */}
        <div className="absolute md:-top-4 md:-left-8 -left-4 -top-4">
          <Logo className="h-64" />
        </div>

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

      {/* Problem Section */}
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

        {/* Content Container */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full z-10 space-y-12">

          {/* THE PROBLEM */}
          <div className="text-center space-y-6">
            <h2 className="text-sm font-bold tracking-widest text-muted-foreground uppercase">The Problem</h2>
            <div className="bg-card/50 backdrop-blur-md border border-white/10 p-8 rounded-xl text-left space-y-4">
              <p className="text-lg md:text-xl text-foreground font-light leading-relaxed">
                You inherit a payment processing system handling <span className="text-white font-medium">$2M/day</span>.
                For the past week, latency spikes to <span className="text-white font-medium">3+ seconds</span> during peak hours,
                causing 2–3% of transactions to timeout.
              </p>
              <ul className="text-muted-foreground space-y-2 font-light">
                <li>• 2 weeks to fix it</li>
                <li>• One junior engineer available</li>
                <li>• No budget for new infrastructure</li>
              </ul>
              <p className="text-lg text-foreground font-light">
                The CEO wants a fix in 10 days. The CTO wants root cause analysis first.
                <br />
                <span className="font-medium text-white">What do you do?</span>
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <a
              href="/engineers"
              className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-105 cursor-pointer text-center"
            >
              <h3 className="text-xl font-medium text-white mb-2">For Engineers</h3>
              <p className="text-sm text-muted-foreground mb-4">Submit your approach anonymously.</p>
              <span className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium group-hover:bg-white/90">
                Solve the Problem
              </span>
            </a>

            <a
              href="/companies"
              className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-105 cursor-pointer text-center"
            >
              <h3 className="text-xl font-medium text-white mb-2">For Companies</h3>
              <p className="text-sm text-muted-foreground mb-4">See how they think, not where they worked.</p>
              <span className="px-6 py-2 bg-transparent border border-white/20 text-white rounded-full text-sm font-medium group-hover:bg-white/5">
                Review Submissions
              </span>
            </a>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Index;
