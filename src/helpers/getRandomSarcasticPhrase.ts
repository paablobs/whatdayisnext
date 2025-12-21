export const sarcasticPhrases: string[] = [
  "Wow. Calculating tomorrow for you…",
  "Thinking, since you didn’t feel like it…",
  "Hang on. This is harder than it looks… apparently.",
  "Doing what your brain refused to do.",
  "Calculating something you learned as a child…",
  "Impressive. You really needed help with this.",
  "Processing… yes, tomorrow comes after today.",
  "Solving the mystery of what comes next.",
  "Applying elite-level common sense.",
  "This could’ve been done mentally, just saying.",
  "Using a server to do basic reasoning.",
  "Advanced calculation: today + 1.",
  "Because thinking is optional now.",
  "Give us a second, this is clearly challenging.",
  "Your brain is on standby. We got this.",
  "Loading… common sense not found locally.",
  "Computing the obvious with unnecessary precision.",
  "Running a full algorithm for a trivial problem.",
  "Congratulations, you outsourced thinking.",
  "Yes. Tomorrow is still a thing.",
  "Still easier than remembering it yourself.",
  "We’re embarrassed for you, but okay.",
  "Using modern technology to avoid thinking.",
  "A calculator for time. Incredible.",
  "Human brain: skipped. Server: engaged.",
  "This is why we can’t have nice things.",
  "Thinking was too risky, huh?",
  "Don’t worry. We’ll handle the hard part.",
  "Calculating the inevitable.",
  "Peak human intelligence right here.",
];

let lastIndex: number | null = null;

export const getRandomSarcasticPhrase = (): string => {
  let index: number;

  do {
    index = Math.floor(Math.random() * sarcasticPhrases.length);
  } while (index === lastIndex);

  lastIndex = index;
  return sarcasticPhrases[index];
};
