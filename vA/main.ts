// One Emoji, One Dream Vacation — entry: "🏖️".
// Competition: u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35 (make.fun, program/v1).
// Variant vA of three for this bounty. A beach with an umbrella: the postcard at a glance — sun, sand, shade, nowhere to be. It reads instantly across cultures and screens, it is specific (a beach holiday, not any holiday), and it carries the dream in one picture. Field check (25 Nov): only 2 copies in the submissions list, against 69 for the desert island and 44 for Mount Fuji — a late identical copy shares one rate with the earlier receipt above it, so rarity matters.
//
// The program writes exactly the entry text to /output/entry.txt (the
// grader's gate: UTF-8 text of 1 to 8 characters, not only white
// space) and prints exactly that text to stdout. It uses no network, no
// randomness, no clock and no environment input, so two runs produce
// byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: the whole submission, and nothing else.
const ENTRY: string = "🏖️";

// The gate allows 1 to 8 characters. Count code points (so an
// emoji counts as the characters a reader sees), and fail loudly instead
// of shipping an invalid entry.
const MAX_CHARS: number = 8;
const charCount: number = [...ENTRY].length;
if (charCount < 1 || charCount > MAX_CHARS || ENTRY.trim().length === 0) {
  throw new Error(
    `invalid entry ${JSON.stringify(ENTRY)}: ${charCount} characters, gate allows 1-${MAX_CHARS}`,
  );
}

// Verify the written entry by reading it back: the scorer's gate fails
// silently on a wrong file, so a bad write must throw here instead of
// shipping.
function verifyEntry(expected: string): void {
  const raw = readFileSync("/output/entry.txt");
  const text = raw.toString("utf8");
  if (text !== expected) {
    throw new Error(
      `entry mismatch: /output/entry.txt holds ${JSON.stringify(text)}, expected ${JSON.stringify(expected)}`,
    );
  }
}

// The grader's gate reads /output/entry.txt. Write the entry with no
// trailing newline, so the file holds exactly the entry.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read the file back and prove what was written is exactly the entry.
verifyEntry(ENTRY);

// Print the entry and nothing else: no newline, so stdout carries
// exactly the entry too.
process.stdout.write(ENTRY);
