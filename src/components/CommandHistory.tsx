import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp, Copy, Trash2 } from 'lucide-react';

interface HistoryItem {
  id: string;
  command: string;
  code: string;
  timestamp: Date;
}

const CommandHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load history from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem('commandHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (error) {
        console.error('Error parsing history:', error);
      }
    }
  }, []);

  // Mock function to add history items (in a real app, this would be called when a command is processed)
  useEffect(() => {
    // Add some example history items for demonstration
    if (history.length === 0) {
      const exampleHistory: HistoryItem[] = [
        {
          id: '1',
          command: 'Enable energy equation',
          code: 'setup.models.energy.enabled = True',
          timestamp: new Date(Date.now() - 3600000) // 1 hour ago
        },
        {
          id: '2',
          command: 'Change turbulence model to k-epsilon',
          code: 'setup.models.viscous.model = "k-epsilon"\nsetup.models.viscous.ke.model = "standard"',
          timestamp: new Date(Date.now() - 7200000) // 2 hours ago
        }
      ];
      setHistory(exampleHistory);
    }
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('commandHistory', JSON.stringify(updatedHistory));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center text-gray-800 dark:text-white">
          <Clock className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-semibold">Command History</h2>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label={isExpanded ? 'Collapse history' : 'Expand history'}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {history.map(item => (
            <div 
              key={item.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{item.command}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(item.timestamp)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(item.code, item.id)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Copy code to clipboard"
                  >
                    {copiedId === item.id ? (
                      <span className="text-green-500 text-xs font-medium">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    aria-label="Delete history item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 overflow-x-auto font-mono text-xs text-gray-800 dark:text-gray-300 transition-colors duration-200">
                <code>{item.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandHistory;