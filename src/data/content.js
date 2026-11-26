/**
 * Every word that can be personalized lives here.
 * Edit this single file to update the surprise.
 */

export const site = {
  title: "For Shirin Ma'am",
  experienceTitle: "A Little Surprise",
  professor: "Shirin Ma'am",
  eyebrow: "FOR SHIRIN MA'AM",
  footerNote: "Made with appreciation by Sayda & Nobin.",
};

export const welcome = {
  label: "A LITTLE SURPRISE",
  heading: "Shirin Ma'am, this is for you.",
  supporting: "A small surprise from two students who appreciate you.",
  signature: "Made with appreciation by Sayda & Nobin.",
  action: "Start the surprise",
  portraitSrc: "/assets/shirin_maam.png",
  portraitAlt: "Portrait of Shirin Ma'am",
};

export const questions = [
  {
    id: "search",
    number: "01",
    question: "Who is your favorite professor?",
    answer: "Shirin Ma'am, of course!",
    supporting: "Some people make learning memorable simply by being who they are.",
  },
  {
    id: "qualities",
    number: "02",
    question: "What makes her classes memorable?",
    answer:
      "The care she puts into sharing what she knows — and the feeling that learning is worth the effort.",
  },
  {
    id: "classroom",
    number: "03",
    question: "What do we appreciate most about her?",
    answer: "Her patience, kindness, and the effort she brings to her work.",
  },
  {
    id: "syllabus",
    number: "04",
    question: "What stays with us beyond the syllabus?",
    answer: "Confidence to ask questions, curiosity to explore, and the courage to keep trying.",
  },
  {
    id: "symbol",
    number: "05",
    question: "What do we wish she knew?",
    answer: "We notice the effort you put into your students, even when we don't say it out loud.",
  },
  {
    id: "notes",
    number: "06",
    question: "Who made this little surprise?",
    answer: "Sayda and Nobin — two of your students, with a small thank-you.",
  },
  {
    id: "heart",
    number: "07",
    question: "What is one thing we want to say before we go?",
    answer: "Thank you, Shirin Ma'am. We're genuinely glad we got to learn from you.",
  },
];

export const searchUi = {
  label: "A LITTLE SEARCH",
  searching: "Searching…",
  resultLabel: "A little result",
  typingHint: "A question is being searched",
};

export const appreciation = {
  heading: "A little more we wanted to say.",
  supporting: "Because some things deserve more than a search result.",
};

export const letter = {
  heading: "A little more we wanted to say.",
  envelopeNote: "Open when you have a moment",
  closeAction: "Fold it back",
  letters: [
    {
      id: "sayda",
      invitation: "A letter from Sayda",
      action: "Open Sayda's letter",
      label: "Sayda's letter",
      continueLabel: "Next",
      message: [
        "Dear Shirin Ma'am,",
        "There is something I especially want to thank you for, and it is the way you care about your students beyond the classroom.",
        "During the times when I have been unwell, your concern has meant more to me than I can properly explain. You personally called to ask how I was doing, checked on me, and made sure I was okay. Those little moments may seem ordinary, but they meant a lot to me. Being remembered and cared for like that made me feel genuinely valued.",
        "I also admire how punctual and responsible you are. The way you take your responsibilities seriously and put your heart into completing every task is something I truly respect. It is clear that you make an effort to do things properly, and I find that quality really inspiring.",
        "I don't think I always express my appreciation well enough, but I want you to know that I notice these things. Your kindness, care, and dedication have made a difference to me, not just as a professor, but as someone who genuinely cares about the people around her.",
        "Thank you for checking on me, for remembering me, and for being so thoughtful. I feel lucky to have a professor like you.",
        "With lots of love, respect and appreciation,",
        "Sayda",
      ],
    },
    {
      id: "nobin",
      invitation: "A letter from Nobin",
      action: "Open Nobin's letter",
      label: "Nobin's letter",
      continueLabel: "Next",
      message: [
        "Dear Shirin Ma'am,",
        "I wanted to take a moment to thank you for the effort and care you put into your classes. I truly appreciate the way you share your knowledge and take your responsibilities seriously. It is easy to notice when someone puts genuine effort into what they do, and I respect that about you.",
        "I also appreciate the thought you give to your students and the time you dedicate to helping us learn. Your patience and commitment make a difference, even in little ways that we may not always express.",
        "I hope this small surprise brings a smile to your face. You deserve to know that your efforts are noticed and appreciated.",
        "Thank you for being such a wonderful professor.",
        "With respect and appreciation,",
        "Nobin",
      ],
    },
    {
      id: "shared",
      invitation: "A letter from both of us",
      action: "Open our letter",
      label: "A note from both of us",
      continueLabel: "Continue",
      message: [
        "Dear Shirin Ma'am,",
        "We wanted to make something small to say something important: THANK YOU.",
        "Thank you for sharing your knowledge, for your patience, and for the effort you bring to your classes.",
        "We might not always find the right words in the moment, but we are genuinely grateful to have learned from you.",

        "Thank you so much for everything Ma'am.",
        "We love you and appreciate you.♡",

        "With appreciation,",
        "Sayda & Nobin",
      ],
    },
  ],
};

export const closing = {
  lines: [
    "Some professors teach us the subject.",
    "Some leave us with a little more confidence to take into the world.",
    "We're grateful we got to learn from you.",
  ],
  final: "Thank you, Shirin Ma'am.",
  signature: ["With appreciation,", "Sayda & Nobin."],
  restart: "Start again",
  skip: "Skip the pause",
};

/**
 * Add real profile objects here when URLs are supplied, for example:
 * { id: "instagram", platform: "Instagram", url: "https://…", thumbnail: "/assets/instagram.svg", alt: "…" }
 * No profile links are displayed until a real URL is added.
 */
export const socialProfiles = [];

export const ui = {
  skipLink: "Skip to content",
  welcomeHeader: "A LITTLE SURPRISE",
  defaultHeader: "FOR SHIRIN MA'AM",
  back: "Back",
  continue: "Continue",
  nextQuestion: "Next question →",
  navHint: "",
  backHintWelcome: "Return to the welcome",
  nextHint: "Next scene",
  nextLabels: {
    appreciation: "To the letters",
  },
  announcements: {
    welcome: "A little surprise for Shirin Ma'am.",
    appreciation: "A little more we wanted to say.",
    letter: "A little more we wanted to say.",
    closing: "A final thank you.",
    question: (number, question) => `Question ${number} of 07: ${question}`,
    answer: (question, answer) => `Search complete. ${question} ${answer}`,
  },
};
