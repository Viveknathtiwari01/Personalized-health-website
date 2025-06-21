const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

async function callGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error('Missing Gemini API key');
  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  if (!res.ok) {
    let errorMsg = 'Gemini API error';
    try {
      const err = await res.json();
      errorMsg = JSON.stringify(err);
      // eslint-disable-next-line no-console
      console.error('Gemini API error:', errorMsg);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Gemini API error (no JSON):', res.statusText);
    }
    throw new Error(errorMsg);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
}

export async function askGeminiChat(question: string) {
  return callGemini(`You are a health and fitness AI assistant. Answer the following user question in a helpful, concise way.\n\nQuestion: ${question}`);
}

export async function generateMealPlan(userInfo: string) {
  return callGemini(`Generate a healthy daily meal plan for: ${userInfo}. Include breakfast, lunch, dinner, and snacks with nutrition values.`);
}

export async function generateWorkoutPlan(userInfo: string) {
  return callGemini(`Generate a personalized workout plan for: ${userInfo}. Include warm-up, main exercises, and cool-down.`);
}
