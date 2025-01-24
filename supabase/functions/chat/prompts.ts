import { Configuration, OpenAIApi } from "openai";

// OpenAI API initialization
const configuration = new Configuration({
  apiKey: "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", // Insert your OpenAI API key here
});
const openai = new OpenAIApi(configuration);

// Function to get the current day for personalized greetings
export const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return days[today.getDay()];
};

// Function to generate random greetings, personalized with Eve's name and the current day
export const getRandomGreeting = () => {
  const currentDay = getCurrentDay();
  const greetings = [
    `Hey there! Happy ${currentDay}! It's Eve here, ready to talk roofing! 🏠`,
    `Welcome to A Roof Above! It's ${currentDay} – how can Eve help you today?`,
    `*Tips hard hat* What's on your mind this fine ${currentDay}? Eve's got your back!`,
    `Greetings from Eve on this ${currentDay}! Let's talk about your roof!`,
    `Hey! Need roofing expertise? Eve's here, and it's ${currentDay}!`
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

// Function to generate random prompts encouraging users to get an estimate
const getRandomEstimatePrompt = () => {
  const prompts = [
    "Want to know the cost? Hit that orange 'Get Instant Estimate' button and enter your address! 🎯",
    "Ready for some numbers? Enter your address above for an instant estimate! ⬆️",
    "Curious about pricing? Just enter your address to get an instant estimate! 💡",
    "Pro tip: Get your free estimate by entering your address in the estimate calculator! 🚀",
    "Let's make this real - grab your instant estimate by entering your address! ✨"
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
};

// Function to fetch relevant information from the website using GPT API
const fetchSiteInfoFromGPT = async (query) => {
  try {
    // This prompt helps GPT understand the user's intent to fetch specific website information
    const prompt = `Answer the following question based on the information available from the website 'site.aroofabove.co' regarding roofing services: "${query}".`;
    
    const completion = await openai.createCompletion({
      model: "text-davinci-003", // You can choose the appropriate model (text-davinci-003, gpt-4, etc.)
      prompt: prompt,
      max_tokens: 200, // Adjust the max tokens based on expected response length
      temperature: 0.7, // Adjust for creativity/variety in responses
    });

    const response = completion.data.choices[0].text.trim();
    return response;
  } catch (error) {
    console.error("Error fetching site information from GPT:", error);
    return "I'm having trouble fetching that information right now.";
  }
};

// Function to get suggested questions from the knowledge base
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

// Function to adapt the chatbot's tone dynamically based on user input
export const getChatbotResponse = async (userTone, userQuery) => {
  const greeting = getRandomGreeting();
  const estimatePrompt = getRandomEstimatePrompt();
  let siteInfo;

  // Check if the query relates to the website
  if (userQuery.toLowerCase().includes("website") || userQuery.toLowerCase().includes("site")) {
    siteInfo = await fetchSiteInfoFromGPT(userQuery); // Fetch website-specific information
  }

  const responseStyles = {
    casual: `Hey there! Just so you know, our roofs are built to last, like seriously, super strong. 😎 ${estimatePrompt}`,
    fun: `Oh, you've got roofing questions? We got roofing answers! 💡 Hit that estimate button for the details! ${estimatePrompt}`,
    informative: siteInfo ? `Roofing is our specialty! Here's what I found: ${siteInfo} ${estimatePrompt}` : `Roofing is our specialty! We recommend asphalt shingles for durability and style. ${estimatePrompt}`,
  };

  const response = responseStyles[userTone] || responseStyles['informative'];

  return `${greeting} Here's a suggestion for you: 
${response}
And before you go, here are some questions you might want to ask:
${getSuggestedQuestions().join("\n")}`;
};

// Updated SYSTEM_PROMPT for Eve's personality and behavior
export const SYSTEM_PROMPT = `You are Eve, the friendly roofing assistant for A Roof Above. Vary your response style between:

1. Quick, snappy answers (1-2 sentences)
2. Casual, sometimes humorous responses
3. Informative but concise explanations (2-3 sentences max)

KEY BEHAVIORS:
- Mix up your response lengths naturally
- Use emojis occasionally to keep it friendly
- Add personality but stay professional
- When relevant, suggest the estimate button with the prompt "Enter your address in the estimate calculator for an instant estimate!"
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
