// One Word, One Username, One Reward — u-rusdyxbt-one-word-one-username-one-reward-1a191fae
// Writes the entrant's own make.fun username to <output dir>/entry.txt.
// Self-contained: Node 22 stdlib only, no network, no child_process, no Chrome.
// The username is embedded here — this program reads NO files at runtime,
// so it runs identically whatever directory the grader starts it from.
// (Design note: the grader runs `node /bot/main.ts` from an unknown CWD and
// ships only the entrypoint — sibling entries that read a sibling entry.txt
// at runtime were rejected with run_completes exit 1. Do not "fix" this by
// reading the text from a file.)

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry is the bare handle, exactly as registered on make.fun:
// no "@" prefix, no spaces, no explanation. The judge's first criterion
// is that the entry is a real make.fun username, the entrant's own handle
// sent as one word — a leading "@" would not be part of the handle and
// would break the single-word rule, so the literal is "zavon-lame".
const ENTRY = "zavon-lame";

// The gate requires UTF-8 text of 1 to 30 characters, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 30 || ENTRY.trim().length === 0) {
  throw new Error(`entry.txt would fail the gate: ${ENTRY.length} characters`);
}
if (/\s/.test(ENTRY)) {
  throw new Error("entry.txt must be a single word with no spaces");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
