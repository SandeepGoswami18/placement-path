import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {
  const { code, language } = req.body;

  try {
    // 🔥 C++
    if (language === "cpp") {
      fs.writeFileSync("temp.cpp", code);

      exec("g++ temp.cpp -o temp.exe && temp.exe", (err, stdout, stderr) => {
        if (err) {
          return res.json({ output: stderr || "Compilation Error" });
        }
        res.json({ output: stdout });
      });
    }

    // 🔥 Python
    else if (language === "python") {
      fs.writeFileSync("temp.py", code);

      exec("python temp.py", (err, stdout, stderr) => {
        if (err) {
          return res.json({ output: stderr });
        }
        res.json({ output: stdout });
      });
    }

    // 🔥 Java
    else if (language === "java") {
      fs.writeFileSync("Main.java", code);

      exec("javac Main.java && java Main", (err, stdout, stderr) => {
        if (err) {
          return res.json({ output: stderr });
        }
        res.json({ output: stdout });
      });
    }

    else {
      res.json({ output: "Unsupported language" });
    }

  } catch (error) {
    res.json({ output: "Execution error" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));