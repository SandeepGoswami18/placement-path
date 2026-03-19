import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Play, Send, BookOpen, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { problems, type Difficulty } from "@/data/problems";

const difficultyClass: Record<Difficulty, string> = {
  Easy: "bg-easy/15 text-easy border-easy/30",
  Medium: "bg-medium/15 text-medium border-medium/30",
  Hard: "bg-hard/15 text-hard border-hard/30",
};

const defaultCode: Record<string, string> = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Write your solution here
    
};

int main() {
    Solution sol;
    // Test your solution
    return 0;
}`,
  java: `import java.util.*;

class Solution {
    // Write your solution here
    
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Test your solution
    }
}`,
  python: `class Solution:
    # Write your solution here
    pass

if __name__ == "__main__":
    sol = Solution()
    # Test your solution
`,
};

const ProblemDetail = () => {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === id);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(defaultCode.cpp);
  const [activeTab, setActiveTab] = useState("description");
  const [rightTab, setRightTab] = useState("editorial");

  if (!problem) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold">Problem not found</h2>
          <Link to="/dsa" className="text-primary hover:underline mt-2 inline-block">← Back to DSA Sheet</Link>
        </div>
      </div>
    );
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <div className="flex h-12 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-3">
          <Link to="/dsa" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <span className="text-border">|</span>
          <h1 className="font-semibold">{problem.title}</h1>
          <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${difficultyClass[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {problem.leetcodeUrl && (
            <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ExternalLink className="h-3.5 w-3.5" /> LeetCode
            </a>
          )}
        </div>
      </div>

      {/* Split view */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Description */}
        <div className="w-[30%] min-w-[280px] border-r border-border overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4">
              <TabsTrigger value="description" className="data-[state=active]:bg-secondary rounded-lg">Description</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 space-y-6">
              <div className="flex flex-wrap gap-1.5">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>

              <div className="prose prose-invert prose-sm max-w-none">
                {problem.description.split("\n").map((line, i) => (
                  <p key={i} className="text-sm text-foreground/80 leading-relaxed">{line}</p>
                ))}
              </div>

              {problem.examples.map((ex, i) => (
                <div key={i} className="rounded-lg border border-border bg-secondary/50 p-4 space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase">Example {i + 1}</h4>
                  <div className="font-mono text-sm">
                    <div><span className="text-muted-foreground">Input: </span>{ex.input}</div>
                    <div><span className="text-muted-foreground">Output: </span>{ex.output}</div>
                    {ex.explanation && <div className="text-muted-foreground mt-1 text-xs">{ex.explanation}</div>}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Center Panel - Code Editor */}
        <div className="flex flex-1 flex-col border-r border-border">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <div className="flex gap-1">
              {["cpp", "java", "python"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    language === lang ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang === "cpp" ? "C++" : lang === "java" ? "Java" : "Python"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-1 text-xs border-border">
                <Play className="h-3.5 w-3.5" /> Run
              </Button>
              <Button size="sm" className="gap-1 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="h-3.5 w-3.5" /> Submit
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-full w-full resize-none bg-muted/30 p-4 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Right Panel - Resources */}
        <div className="w-[25%] min-w-[250px] overflow-y-auto">
          <Tabs value={rightTab} onValueChange={setRightTab}>
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4">
              <TabsTrigger value="editorial" className="gap-1 data-[state=active]:bg-secondary rounded-lg">
                <BookOpen className="h-3.5 w-3.5" /> Editorial
              </TabsTrigger>
              <TabsTrigger value="video" className="gap-1 data-[state=active]:bg-secondary rounded-lg">
                <Video className="h-3.5 w-3.5" /> Video
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editorial" className="p-4">
              {problem.editorial ? (
                <div className="rounded-lg border border-border bg-secondary/30 p-4 text-sm leading-relaxed text-foreground/80">
                  {problem.editorial}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Editorial coming soon...</p>
              )}
            </TabsContent>
            <TabsContent value="video" className="p-4">
              {problem.videoUrl ? (
                <div className="aspect-video overflow-hidden rounded-lg border border-border">
                  <iframe
                    src={problem.videoUrl}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Video solution coming soon...</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;