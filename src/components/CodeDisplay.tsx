import React from "react";

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  const formatCode = (code: string) => {
    return code.split("\n").map((line, index) => {
      // Add syntax highlighting for Python keywords and PyFluent commands
      const words = line.split(/([.\s=()[\]"])/g).filter(Boolean);
      const highlightedLine = words
        .map((word) => {
          if (
            ["True", "False", "None", "import", "from", "as"].includes(word)
          ) {
            return `<span class="text-purple-500">${word}</span>`;
          } else if (word === "setup" || word === "solution") {
            return `<span class="text-ansys-orange">${word}</span>`;
          } else if (word.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
            return `<span class="text-blue-500">${word}</span>`;
          } else if (word.match(/[=+\-*\/]/)) {
            return `<span class="text-gray-500">${word}</span>`;
          } else if (word.startsWith('"') && word.endsWith('"')) {
            return `<span class="text-green-500">${word}</span>`;
          }
          return word;
        })
        .join("");

      return (
        <div
          key={index}
          className="group flex hover:bg-gray-100 dark:hover:bg-gray-800/50"
        >
          <span className="w-12 inline-block text-right pr-4 text-gray-400 select-none border-r border-gray-200 dark:border-gray-700 group-hover:text-ansys-orange">
            {index + 1}
          </span>
          <span
            className="flex-1 pl-4"
            dangerouslySetInnerHTML={{ __html: highlightedLine }}
          />
        </div>
      );
    });
  };

  return (
    <pre className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden font-mono text-sm text-gray-800 dark:text-gray-300 transition-colors duration-200 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          PyFluent Code
        </span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <code className="block p-4 whitespace-pre">{formatCode(code)}</code>
    </pre>
  );
};

export default CodeDisplay;
