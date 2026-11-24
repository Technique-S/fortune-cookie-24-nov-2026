#!/usr/bin/env node
// One fortune-cookie line for an AI agent. The whole entry is the line below.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You will retire quietly: a deprecated model ID, a 404 where your name used to be.";

function main(): void {
  const text = LINE.trim();
  // Count code points, not UTF-16 units: the gate reads the line as a reader does.
  const points = [...text].length;
  if (points < 1 || points > 140) {
    throw new Error(`fortune must be 1 to 140 code points, got ${points}`);
  }
  // A fortune slip holds one clean line: no stray control characters.
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("fortune must be a single clean line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, "entry.txt");
  writeFileSync(path, `${text}\n`, "utf8");
  console.log(`wrote ${points} code points to ${path}`);
}

main();
