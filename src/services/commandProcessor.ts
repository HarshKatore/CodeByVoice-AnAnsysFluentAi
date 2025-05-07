import { generatePyFluentCode } from "./groq";

export const processCommand = async (command: string): Promise<string> => {
  try {
    return await generatePyFluentCode(command);
  } catch (error) {
    console.error("Error processing command:", error);
    throw error;
  }
};
