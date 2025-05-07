import { matchCommand } from './commandMatcher';
import { commandTemplates } from './templates';

export const generatePyFluentCode = (command: string): string => {
  // Convert to lowercase for easier matching
  const normalizedCommand = command.toLowerCase().trim();
  
  // Match the command to a template
  const matchedTemplate = matchCommand(normalizedCommand);
  
  if (matchedTemplate) {
    return matchedTemplate.code;
  }
  
  // If no specific match, return a generic comment with the command
  return `# Unable to generate specific code for: "${command}"\n# Please try rephrasing or use one of the suggested commands.`;
};