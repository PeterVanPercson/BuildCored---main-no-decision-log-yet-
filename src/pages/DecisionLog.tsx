import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface FormData {
  decision: string;
  alternatives: string;
  expected_outcome: string;
  actual_outcome: string;
  lessons_learned: string;
  tags: string;
}

const DecisionLog = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    decision: "",
    alternatives: "",
    expected_outcome: "",
    actual_outcome: "",
    lessons_learned: "",
    tags: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.decision.trim()) {
      toast.error("Decision is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/decision-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      toast.success("Decision log submitted successfully");
      setFormData({
        decision: "",
        alternatives: "",
        expected_outcome: "",
        actual_outcome: "",
        lessons_learned: "",
        tags: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit decision log"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>

        <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-2">
          Decision Log
        </h1>
        <p className="text-muted-foreground mb-8">
          Document your engineering decisions for future reference.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="decision">Decision *</Label>
            <Textarea
              id="decision"
              name="decision"
              placeholder="What decision did you make?"
              value={formData.decision}
              onChange={handleChange}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alternatives">Alternatives Considered</Label>
            <Textarea
              id="alternatives"
              name="alternatives"
              placeholder="What other options did you consider?"
              value={formData.alternatives}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expected_outcome">Expected Outcome</Label>
            <Textarea
              id="expected_outcome"
              name="expected_outcome"
              placeholder="What outcome do you expect from this decision?"
              value={formData.expected_outcome}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="actual_outcome">Actual Outcome</Label>
            <Textarea
              id="actual_outcome"
              name="actual_outcome"
              placeholder="What was the actual outcome? (Fill in later)"
              value={formData.actual_outcome}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lessons_learned">Lessons Learned</Label>
            <Textarea
              id="lessons_learned"
              name="lessons_learned"
              placeholder="What did you learn from this decision?"
              value={formData.lessons_learned}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="architecture, database, api (comma-separated)"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? "Submitting..." : "Submit Decision"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default DecisionLog;
