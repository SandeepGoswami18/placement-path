import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden grid-bg">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 text-center">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-3.5 w-3.5" />
            Your Complete Placement Prep Ecosystem
          </div>

          <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
            Crack Your
            <br />
            <span className="text-primary glow-text">Dream Placement</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Master DSA, OS, CN, OOPs & DBMS with structured sheets, an integrated code editor, contests, and progress tracking — all in one place.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground glow-purple">
              <Link to="/dsa">
                Start DSA Sheet <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border hover:bg-secondary">
              <Link to="/subjects">Explore Subjects</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span>450+ Problems</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <span>10k+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-medium" />
              <span>Weekly Contests</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;