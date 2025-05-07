import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Copy, Check } from 'lucide-react';
import CodeDisplay from './CodeDisplay';
import { processCommand } from '../services/commandProcessor';

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

const SpeechRecognition: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef<any>(null);
  const isRecognitionSupportedRef = useRef(false);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      isRecognitionSupportedRef.current = true;
      
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(interimTranscript);
        if (finalTranscript) {
          setFinalTranscript(finalTranscript);
          generatePyFluentCode(finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.start();
    } else if (!isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const toggleListening = () => {
    if (!isRecognitionSupportedRef.current) {
      alert('Speech recognition is not supported in this browser. Please try using Chrome or Edge.');
      return;
    }
    setIsListening(prevState => !prevState);
  };

  const generatePyFluentCode = async (command: string) => {
    setIsProcessing(true);
    try {
      const code = await processCommand(command);
      setGeneratedCode(code);
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Speak Your Ansys Fluent Command
      </h2>
      
      <div className="flex flex-col md:flex-row md:items-center mb-6">
        <button
          onClick={toggleListening}
          className={`flex items-center justify-center px-6 py-3 rounded-full font-medium text-white transition-all duration-200 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5 mr-2" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 mr-2" />
              Start Listening
            </>
          )}
        </button>
        
        <div className="mt-4 md:mt-0 md:ml-4 text-gray-600 dark:text-gray-300 text-sm">
          {isListening && (
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span>Listening...</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-h-[100px] text-gray-700 dark:text-gray-300 transition-colors duration-200">
          {transcript || finalTranscript || 'Say something like "Enable the energy equation" or "Change turbulence model to k-epsilon"'}
        </div>
      </div>
      
      {(isProcessing || generatedCode) && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
            Generated PyFluent Code
          </h3>
          
          {isProcessing ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : (
            <div className="relative">
              <CodeDisplay code={generatedCode} />
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Copy code to clipboard"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="mb-2">Try saying:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>"Enable the energy equation"</li>
          <li>"Change turbulence model to k-epsilon"</li>
          <li>"Set operating pressure to 101325 pascals"</li>
          <li>"Initialize the solution using hybrid initialization"</li>
        </ul>
      </div>
    </div>
  );
};

export default SpeechRecognition;