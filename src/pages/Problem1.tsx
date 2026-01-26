import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const PROMPT_TEXT = `You inherit a payment processing system handling $2M/day. For the past week, latency spikes to 3+ seconds during peak hours (2–4pm), causing 2–3% of transactions to timeout.

You have:
• 2 weeks
• One junior engineer (started 3 months ago)
• No budget for new infrastructure
• Access to logs, metrics, and the codebase

The situation:
• CEO wants a fix before a board meeting in 10 days
• CTO wants root cause understood before any fix ships
• The on-call engineer who knew the system best quit last month`;

const LIMITS: Record<string, number> = {
  first_action: 280,
  why_first: 280,
  second_action: 280,
  why_second: 280,
  third_action: 280,
  signals_data_first: 280,
  wont_do: 450,
  biggest_risk: 350,
  verify_and_rollback: 350,
  with_more_time: 280,
};

const DECISION_FIELDS = [
  { name: "first_action", label: "What's the first thing you do?", max: 280 },
  { name: "why_first", label: "Why this first?", max: 280 },
  { name: "second_action", label: "What's the second thing you do?", max: 280 },
  { name: "why_second", label: "Why this second?", max: 280 },
  { name: "third_action", label: "What's the third thing you do?", max: 280 },
  {
    name: "signals_data_first",
    label: "What signals/data do you check first? What are you trying to learn?",
    max: 280,
  },
  { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
  {
    name: "biggest_risk",
    label: "Biggest risk in your approach + how you mitigate it",
    max: 350,
  },
  {
    name: "verify_and_rollback",
    label: "How do you verify success? What's your rollback plan?",
    max: 350,
  },
  {
    name: "with_more_time",
    label: "If you had 2 more weeks, what would you do differently?",
    max: 280,
  },
];

interface FormData {
  email: string;
  visibility: string;
  role_track: string;
  seniority: string;
  time_budget: string;
  first_action: string;
  why_first: string;
  second_action: string;
  why_second: string;
  third_action: string;
  signals_data_first: string;
  wont_do: string;
  biggest_risk: string;
  verify_and_rollback: string;
  with_more_time: string;
  attest_original: boolean;
}

export default function Problem1() {
  const [quickInfoOpen, setQuickInfoOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    visibility: "unlisted",
    role_track: "",
    seniority: "",
    time_budget: "",
    first_action: "",
    why_first: "",
    second_action: "",
    why_second: "",
    third_action: "",
    signals_data_first: "",
    wont_do: "",
    biggest_risk: "",
    verify_and_rollback: "",
    with_more_time: "",
    attest_original: false,
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = () => {
    const requiredTextFields = DECISION_FIELDS.map((f) => f.name as keyof FormData);
    const allTextFilled = requiredTextFields.every(
      (field) => formData[field] && (formData[field] as string).trim().length > 0
    );
    const emailValid = formData.email.includes("@");
    const attested = formData.attest_original;

    // Check no field exceeds limit
    const withinLimits = requiredTextFields.every((field) => {
      const value = formData[field] as string;
      const limit = LIMITS[field];
      return !value || value.length <= limit;
    });

    return allTextFilled && emailValid && attested && withinLimits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submit-decision-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setHandle(data.handle);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-xl text-center space-y-6">
          <h1 className="text-3xl font-semibold text-foreground">
            Submitted as{" "}
            <span className="text-primary">{handle}</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Companies see your reasoning anonymously.
            <br />
            If they want to interview you, we'll email you.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            PROBLEM #1 — BACKEND / FULL-STACK ENGINEER
          </h1>
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <pre className="whitespace-pre-wrap text-sm md:text-base text-foreground/90 font-mono leading-relaxed">
              {PROMPT_TEXT}
            </pre>
          </div>
          <p className="text-muted-foreground text-sm">
            This takes 15–25 minutes. Privacy-first. Companies compare reasoning,
            not resumes.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Quick Info (collapsible) */}
          <Collapsible open={quickInfoOpen} onOpenChange={setQuickInfoOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-full">
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  quickInfoOpen ? "rotate-180" : ""
                }`}
              />
              <span className="text-sm font-medium">
                Quick Info (optional)
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Role Track
                  </label>
                  <select
                    value={formData.role_track}
                    onChange={(e) => updateField("role_track", e.target.value)}
                    className="w-full bg-card border border-border rounded-lg p-3 text-foreground focus:border-muted-foreground focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="Backend">Backend</option>
                    <option value="SRE">SRE</option>
                    <option value="Security">Security</option>
                    <option value="Fullstack">Fullstack</option>
                    <option value="Mobile">Mobile</option>
                    <option value="ML">ML</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Seniority
                  </label>
                  <select
                    value={formData.seniority}
                    onChange={(e) => updateField("seniority", e.target.value)}
                    className="w-full bg-card border border-border rounded-lg p-3 text-foreground focus:border-muted-foreground focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="Student">Student</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Staff+">Staff+</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Time Budget
                  </label>
                  <select
                    value={formData.time_budget}
                    onChange={(e) => updateField("time_budget", e.target.value)}
                    className="w-full bg-card border border-border rounded-lg p-3 text-foreground focus:border-muted-foreground focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="15m">15m</option>
                    <option value="30m">30m</option>
                    <option value="60m">60m</option>
                    <option value="2h">2h</option>
                  </select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Section 2: Decision Log */}
          <section className="space-y-6">
            <h2 className="text-lg font-medium text-foreground border-b border-border pb-2">
              Decision Log
            </h2>
            {DECISION_FIELDS.map((field) => {
              const value = formData[field.name as keyof FormData] as string;
              const isOverLimit = value.length > field.max;
              return (
                <div key={field.name}>
                  <label className="block text-sm text-foreground mb-2">
                    {field.label}
                  </label>
                  <Textarea
                    value={value}
                    onChange={(e) =>
                      updateField(field.name as keyof FormData, e.target.value)
                    }
                    className="bg-card border-border focus:border-muted-foreground min-h-[100px]"
                    placeholder="Your response..."
                  />
                  <p
                    className={`text-xs mt-1 ${
                      isOverLimit ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {value.length} / {field.max}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Attestation */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="attest"
              checked={formData.attest_original}
              onCheckedChange={(checked) =>
                updateField("attest_original", checked === true)
              }
            />
            <label
              htmlFor="attest"
              className="text-sm text-foreground cursor-pointer"
            >
              I wrote this myself.
            </label>
          </div>

          {/* Section 3: Contact */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-foreground border-b border-border pb-2">
              Contact
            </h2>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                For interview requests only — never shown to companies
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-card border-border focus:border-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Visibility
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => updateField("visibility", e.target.value)}
                className="w-full bg-card border border-border rounded-lg p-3 text-foreground focus:border-muted-foreground focus:outline-none"
              >
                <option value="unlisted">Unlisted</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </section>

          {/* Error */}
          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={!isValid() || submitting}
            className="w-full bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-zinc-200 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Decision Log"}
          </Button>
        </form>
      </div>
    </main>
  );
}
