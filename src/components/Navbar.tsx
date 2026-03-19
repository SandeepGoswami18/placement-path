import { Link, useLocation } from "react-router-dom";
import { Code2, BookOpen, Trophy, LayoutDashboard } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: LayoutDashboard },
  { path: "/dsa", label: "DSA Sheet", icon: Code2 },
  { path: "/subjects", label: "Subjects", icon: BookOpen },
  { path: "/contests", label: "Contests", icon: Trophy },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 glow-purple">
            <Code2 className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight font-mono">
            Prep<span className="text-primary">Arena</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary glow-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;