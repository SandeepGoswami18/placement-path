import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Play, Send } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { problems, type Difficulty } from "@/data/problems";

const difficultyClass: Record<Difficulty, string> = {
  Easy: "bg-easy/15 text-easy border-easy/30",
  Medium: "bg-medium/15 text-medium border-medium/30",
  Hard: "bg-hard/15 text-hard border-hard/30",
};

// 🔥 FIXED DEFAULT CODE
const defaultCode: Record<string, string> = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello Bhai 🚀";
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Bhai 🚀");
    }
}`,
  python: `print("Hello Bhai 🚀")`,
};

const ProblemDetail = () => {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === id);

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(defaultCode.cpp);
  const [output, setOutput] = useState("");

  if (!problem) return <div>Problem not found</div>;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);
  };

  // 🔥 FINAL RUN FUNCTION
  const runCode = async () => {
    setOutput("Running...");

    try {
      const res = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      console.log("FRONTEND RESPONSE:", data);

      if (data.output && data.output.trim() !== "") {
        setOutput(data.output);
      } else {
        setOutput("No output");
      }

    } catch (err) {
      setOutput("Error running code");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">

      {/* TOP BAR */}
      <div className="flex h-12 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-3">
          <Link to="/dsa" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          <span className="text-border">|</span>

          <h1 className="font-semibold">{problem.title}</h1>

          <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${difficultyClass[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>

        {problem.leetcodeUrl && (
          <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground">
            LeetCode
          </a>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-[30%] border-r border-border overflow-y-auto p-4">
          <div className="text-sm space-y-2">{problem.description}</div>
        </div>

        {/* CENTER */}
        <div className="flex flex-1 flex-col border-r border-border">

          {/* HEADER */}
          <div className="flex justify-between items-center border-b border-border px-4 py-2">
            <div className="flex gap-2">
              {["cpp", "java", "python"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 text-xs ${
                    language === lang ? "bg-primary text-white" : "text-muted-foreground"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={runCode}>
                <Play className="h-3 w-3" /> Run
              </Button>

              <Button size="sm">
                <Send className="h-3 w-3" /> Submit
              </Button>
            </div>
          </div>

          {/* EDITOR */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(v) => setCode(v || "")}
              theme="vs-dark"
            />
          </div>

          {/* 🔥 OUTPUT BOX FIXED */}
          <div className="h-32 border-t border-border p-3 bg-black text-green-400 font-mono text-sm overflow-auto">
            {output?.trim() || "No output"}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[25%] border-l border-border p-4">
          {problem.editorial || "Coming soon..."}
        </div>

      </div>
    </div>
  );
};

export default ProblemDetail;