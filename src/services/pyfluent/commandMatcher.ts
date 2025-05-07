import { CommandTemplate, commandTemplates } from './templates';

export const matchCommand = (command: string): CommandTemplate | null => {
  // Check for exact matches first
  const exactMatch = commandTemplates.find(template => 
    template.patterns.some(pattern => pattern === command)
  );
  
  if (exactMatch) return exactMatch;
  
  // Check for pattern matches (contains keywords)
  for (const template of commandTemplates) {
    for (const pattern of template.patterns) {
      const keywords = pattern.split(/\s+/);
      const keywordMatchCount = keywords.filter(keyword => 
        command.includes(keyword) && keyword.length > 3 // Only count significant keywords
      ).length;
      
      // If more than half of the significant keywords match, consider it a match
      if (keywordMatchCount > 0 && keywordMatchCount >= keywords.filter(k => k.length > 3).length / 2) {
        return template;
      }
    }
  }
  
  return null;
};