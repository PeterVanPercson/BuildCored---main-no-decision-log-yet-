import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const PROBLEMS = [
  { id: 1, title: "Backend / Full-Stack Engineer", short: "Backend" },
  { id: 2, title: "Frontend Engineer", short: "Frontend" },
  { id: 3, title: "SRE / Platform / DevOps Engineer", short: "SRE/DevOps" },
  { id: 4, title: "Mobile Engineer (iOS / Android)", short: "Mobile" },
  { id: 5, title: "Data / ML Engineer", short: "Data/ML" },
  { id: 6, title: "Security Engineer", short: "Security" },
  { id: 7, title: "QA / Test Engineer", short: "QA/Test" },
  { id: 8, title: "Engineering Manager", short: "EM" },
  { id: 9, title: "Junior / Entry-Level Engineer", short: "Junior" },
  { id: 10, title: "Product Engineer / Generalist", short: "Product" },
];

const NAV_ITEMS = [
  { label: "Problems", href: "/problems", hasDropdown: true },
  { label: "Engineers", href: "/engineers" },
  { label: "Companies", href: "/companies" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [problemsOpen, setProblemsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-foreground tracking-tight">
              BUILDCORED
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setProblemsOpen(true)}
                    onMouseLeave={() => setProblemsOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition ${
                        location.pathname.startsWith("/problem")
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Dropdown */}
                    {problemsOpen && (
                      <div className="absolute top-full left-0 mt-1 w-72 bg-card border border-border rounded-lg shadow-xl py-2">
                        <Link
                          to="/problems"
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                        >
                          View All Problems
                        </Link>
                        <div className="border-t border-border my-2" />
                        {PROBLEMS.map((problem) => (
                          <Link
                            key={problem.id}
                            to={`/problem/${problem.id}`}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                          >
                            <span className="text-primary font-mono">#{problem.id}</span>{" "}
                            {problem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                      location.pathname === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Apply Button */}
            <Link
              to="/problems"
              className="ml-4 rounded-full px-5 py-2 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
            >
              Apply
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setProblemsOpen(!problemsOpen)}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-foreground"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          problemsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {problemsOpen && (
                      <div className="pl-4 space-y-1">
                        <Link
                          to="/problems"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-muted-foreground"
                        >
                          View All Problems
                        </Link>
                        {PROBLEMS.map((problem) => (
                          <Link
                            key={problem.id}
                            to={`/problem/${problem.id}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-muted-foreground"
                          >
                            #{problem.id} {problem.short}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/problems"
              onClick={() => setMobileMenuOpen(false)}
              className="block mx-4 mt-4 text-center rounded-full px-5 py-2 text-sm font-medium text-black bg-white"
            >
              Apply
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
