import { Link } from "react-router-dom";
import { Code2, Cpu, Globe, Box, Database } from "lucide-react";

const subjects = [
  { title: "DSA", desc: "Data Structures & Algorithms — the core of placements", icon: Code2, path: "/dsa", count: "450+ Problems", color: "text-primary" },
  { title: "Operating System", desc: "Process management, memory, scheduling & more", icon: Cpu, path: "/subjects", count: "120+ Questions", color: "text-accent" },
  { title: "Computer Networks", desc: "OSI, TCP/IP, HTTP, DNS & networking fundamentals", icon: Globe, path: "/subjects", count: "100+ Questions", color: "text-easy" },
  { title: "OOPs", desc: "Inheritance, polymorphism, abstraction & design patterns", icon: Box, path: "/subjects", count: "80+ Questions", color: "text-medium" },
  { title: "DBMS", desc: "SQL, normalization, transactions & indexing", icon: Database, path: "/subjects", count: "90+ Questions", color: "text-hard" },
];

const SubjectCards = () => {
  return (
    <section className="container py-24">
      <h2 className="mb-2 text-center text-3xl font-bold">
        Structured <span className="text-primary">Learning Paths</span>
      </h2>
      <p className="mb-12 text-center text-muted-foreground">Everything you need to ace your placement interviews</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <Link
            key={s.title}
            to={s.path}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:glow-border hover:bg-secondary/50"
          >
            <div className={`mb-4 inline-flex rounded-lg bg-secondary p-3 ${s.color}`}>
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">{s.title}</h3>
            <p className="mb-3 text-sm text-muted-foreground">{s.desc}</p>
            <span className="text-xs font-mono text-muted-foreground">{s.count}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SubjectCards;