import React from 'react';

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  // Add syntax highlighting classes for Python code
  // This is a simple implementation; for more advanced highlighting, consider using a library like prism.js
  const formatCode = (code: string) => {
    return code.split('\n').map((line, index) => (
      <div key={index} className="px-2 py-1 border-l-2 border-transparent hover:border-blue-500 transition-colors">
        <span className="mr-4 text-gray-500 select-none">{index + 1}</span>
        <span>{line}</span>
      </div>
    ));
  };

  return (
    <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto font-mono text-sm text-gray-800 dark:text-gray-300 transition-colors duration-200">
      <code>
        {formatCode(code)}
      </code>
    </pre>
  );
};

export default CodeDisplay;