export const nextPhrases: string[] = [
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

export const todayPhrases: string[] = [
  "Checking what day it is… for you.",
  "Let’s figure out what planet you’re on today.",
  "Consulting reality… one moment.",
  "Determining what day you woke up in.",
  "Because calendars are apparently decorative.",
  "Hold on, we’ll ask the universe.",
  "Verifying that today is… today.",
  "Double-checking the concept of “now.”",
  "Accessing basic awareness module…",
  "Loading today’s date, since you couldn’t.",
  "Calculating what day you’re currently living in.",
  "Let’s confirm you exist in time.",
  "Syncing with the obvious…",
  "Finding out what day you’ve been in all along.",
  "Cross-referencing with common sense…",
  "One second. Time is complicated, apparently.",
  "Processing current-day detection…",
  "Because glancing at a calendar was too mainstream.",
  "Determining today’s identity crisis…",
  "Checking if it’s still the same day as five minutes ago.",
  "Running advanced “what is today” protocol.",
  "Using modern servers to answer ancient questions.",
  "Yes, today still exists.",
  "Making sure you didn’t time travel.",
  "Looking outside was not an option, huh?",
  "Confirming today hasn’t been canceled.",
  "Engaging hyper-intelligent day recognition system.",
  "We’ll let you know what day you’re in.",
  "Calculating the present moment… carefully.",
  "Peak productivity right here.",
];

const lastIndexByMode: Record<string, number | null> = {
  next: null,
  today: null,
};

export const getRandomSarcasticPhrase = (
  mode: "today" | "next" = "next"
): string => {
  const pool = mode === "today" ? todayPhrases : nextPhrases;
  let index: number;

  do {
    index = Math.floor(Math.random() * pool.length);
  } while (index === lastIndexByMode[mode]);

  lastIndexByMode[mode] = index;
  return pool[index];
};
