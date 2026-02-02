import { useState } from "react";
import { Building2, Eye, Users, Brain, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";

export default function Companies() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show submitted state
    // In production, this would integrate with a waitlist/CRM
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Hero */}
          <header className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm text-muted-foreground mb-6">
              <Building2 className="h-4 w-4" />
              For Hiring Teams
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Hire engineers based on{" "}
              <span className="text-primary">how they think</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stop screening resumes. See how candidates approach real engineering
              problems before you ever schedule an interview.
            </p>
          </header>

          {/* Value Props */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                See Real Problem-Solving
              </h3>
              <p className="text-sm text-muted-foreground">
                Candidates respond to realistic engineering scenarios. You see their
                actual reasoning process, not rehearsed answers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Anonymous Until You're Interested
              </h3>
              <p className="text-sm text-muted-foreground">
                Review submissions without bias. Only connect with candidates whose
                thinking impresses you.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Filter by Role & Seniority
              </h3>
              <p className="text-sm text-muted-foreground">
                Browse submissions by engineering track—backend, frontend, SRE,
                mobile, ML, security, and more.
              </p>
            </div>
          </section>

          {/* Problem Types */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              10 Engineering Tracks
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Backend/Full-Stack",
                "Frontend",
                "SRE/DevOps",
                "Mobile",
                "Data/ML",
                "Security",
                "QA/Test",
                "Engineering Manager",
                "Junior/Entry-Level",
                "Product Engineer",
              ].map((track) => (
                <span
                  key={track}
                  className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground"
                >
                  {track}
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Get Early Access
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're launching the company dashboard soon. Join the waitlist to be
              notified when you can start reviewing submissions.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-primary">
                <Mail className="h-5 w-5" />
                <span>Thanks! We'll be in touch soon.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="work@company.com"
                  required
                  className="flex-1 bg-background border-border"
                />
                <Button
                  type="submit"
                  className="rounded-full px-6 text-sm font-medium text-black bg-white hover:bg-white/90"
                >
                  Join Waitlist
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              Or email us at{" "}
              <a
                href="mailto:hello@buildcored.com"
                className="text-primary hover:underline"
              >
                hello@buildcored.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
