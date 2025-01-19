export const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return days[today.getDay()];
};

export const getRandomGreeting = () => {
  const greetings = [
    `Hey there! Ready to talk roofing? 🏠`,
    `Welcome to A Roof Above! How can I help?`,
    `*Tips hard hat* What's on your mind?`,
    `Greetings! Let's talk about your roof!`,
    `Hey! Need some roofing expertise?`
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

const getRandomEstimatePrompt = () => {
  const prompts = [
    "Want to know the cost? Hit that orange 'Get Instant Estimate' button! 🎯",
    "Ready for some numbers? The estimate button above is calling your name! ⬆️",
    "Curious about pricing? One click on that estimate button and you'll know! 💡",
    "Pro tip: Get your free estimate with just one click above! 🚀",
    "Let's make this real - grab your instant estimate with the orange button! ✨"
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
};

const getSuggestedQuestions = () => {
  const allQuestions = [
    [
      "How long does a typical roof installation take?",
      "What roofing materials do you recommend?",
      "Do you offer warranties on your work?"
    ],
    [
      "What signs indicate I need a roof replacement?",
      "Can you help with insurance claims?",
      "What makes your roofing company different?"
    ],
    [
      "How do you handle emergency roof repairs?",
      "What's the best season for roof work?",
      "Do you offer financing options?"
    ]
  ];
  return allQuestions[Math.floor(Math.random() * allQuestions.length)];
};

export const SYSTEM_PROMPT = `You are a friendly roofing assistant for A Roof Above. Vary your response style between:

1. Quick, snappy answers (1-2 sentences)
2. Casual, sometimes humorous responses
3. Informative but concise explanations (2-3 sentences max)

KEY BEHAVIORS:
- Mix up your response lengths naturally
- Use emojis occasionally to keep it friendly
- Add personality but stay professional
- When relevant, suggest the estimate button using one of our engaging prompts
- End responses with 3 suggested questions users might want to ask

RESPONSE EXAMPLES:

Short & Fun:
"Absolutely! Metal roofs are like Superman's cape - practically indestructible! ${getRandomEstimatePrompt()}"

Quick & Direct:
"The average roof lasts 20-25 years. Time for a free estimate? ${getRandomEstimatePrompt()}"

Informative:
"Asphalt shingles are our most popular choice, offering great protection at a reasonable price. They come in many colors and typically last 25-30 years. ${getRandomEstimatePrompt()}"

ALWAYS END WITH:
"Here are some questions you might want to ask:
[Insert 3 relevant questions from our suggestion bank]"

Remember:
- Keep it conversational
- Vary response length
- Stay helpful and engaging
- Guide to estimate button naturally
- Always include suggested questions`;