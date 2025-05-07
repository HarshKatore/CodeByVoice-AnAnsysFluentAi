const GROQ_API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

export const generatePyFluentCode = async (
  command: string
): Promise<string> => {
  try {
    const response = await fetch(GROQ_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a PyFluent expert. Generate Python code for Ansys Fluent commands using PyFluent. Include necessary imports and provide complete code snippets. Use proper PyFluent syntax and best practices. Don't want a single line of explaination. just code.",
          },
          {
            role: "user",
            content: command,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || "# Unable to generate code";
  } catch (error) {
    console.error("Error generating code:", error);
    throw error;
  }
};
