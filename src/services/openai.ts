import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generatePyFluentCode = async (command: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a PyFluent expert. Generate only the Python code for Ansys Fluent commands using PyFluent. Provide code only, no explanations. Use proper PyFluent syntax and best practices."
        },
        {
          role: "user",
          content: command
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0].message.content || '# Unable to generate code';
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};