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
              "You are a PyFluent expert. Generate ONLY the specific PyFluent command using the latest 2024R1 syntax. Important syntax rules:\n" +
              "- Energy equation: setup.models.energy.enabled = True\n" +
              "- NOT setup.models.energy_model.enabled or any other variation\n" +
              "- Viscous models: setup.models.viscous.model = 'ke'\n" +
              "- Boundary conditions: setup.boundary_conditions['velocity-inlet']['inlet']\n" +
              "- Operating conditions: setup.operating_conditions.operating_pressure\n" +
              "- Solution: solution.calculation.iterate()\n" +
              "Keep it minimal, no imports or comments. Only return the exact command needed.",
          },
          {
            role: "user",
            content: command,
          },
        ],
        temperature: 0.3, // Reduced temperature for more deterministic outputs
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
