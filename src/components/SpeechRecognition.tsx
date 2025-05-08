import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Loader2, Copy, Check } from "lucide-react";
import CodeDisplay from "./CodeDisplay";
import { processCommand } from "../services/commandProcessor";

const SpeechRecognition: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef<typeof window.SpeechRecognition | null>(null);
  const isRecognitionSupportedRef = useRef(false);

  const commonCommands = [
    "Enable energy equation",
    "Set turbulence model to k-epsilon",
    "Initialize solution"
  ];

  useEffect(() => {
    // Check if speech recognition is supported
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      isRecognitionSupportedRef.current = true;

      // Initialize speech recognition
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";

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

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening && recognitionRef.current) {
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  useEffect(() => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.start();
    } else if (!isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const toggleListening = () => {
    if (!isRecognitionSupportedRef.current) {
      alert(
        "Speech recognition is not supported in this browser. Please try using Chrome or Edge."
      );
      return;
    }
    setIsListening((prevState) => !prevState);
  };

  const generatePyFluentCode = async (command: string) => {
    setIsProcessing(true);
    try {
      const code = await processCommand(command);
      setGeneratedCode(code);
    } catch (error) {
      console.error("Error generating code:", error);
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
          className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
            isListening
              ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
              : "bg-ansys-blue hover:bg-[#1a367c] shadow-ansys-blue/30"
          } shadow-lg`}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 mr-2" />
              Start Recording
            </>
          )}
        </button>

        <div className="mt-4 md:mt-0 md:ml-4 text-gray-600 dark:text-gray-300 text-sm">
          {isListening && (
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span>Listening...</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-h-[100px] text-gray-700 dark:text-gray-300 transition-colors duration-200">
          <p className="font-medium text-sm text-gray-400 dark:text-gray-500 mb-2">
            Transcription
          </p>
          <p>
            {transcript || finalTranscript || (
              <span className="text-gray-400 dark:text-gray-500">
                Try saying: "Enable energy equation", "Set turbulence model to
                k-epsilon", or "Initialize solution"
              </span>
            )}
          </p>
        </div>
      </div>

      {(isProcessing || generatedCode) && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Generated PyFluent Code
            </h3>
            {!isProcessing && (
              <button
                onClick={copyToClipboard}
                className="flex items-center px-3 py-1.5 text-sm text-ansys-blue dark:text-white bg-ansys-blue/10 dark:bg-white/10 rounded-md hover:bg-ansys-blue/20 dark:hover:bg-white/20 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1.5" />
                    Copy Code
                  </>
                )}
              </button>
            )}
          </div>

          {isProcessing ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="w-8 h-8 text-ansys-orange animate-spin" />
            </div>
          ) : (
            <div className="relative">
              <CodeDisplay code={generatedCode} />
            </div>
          )}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-4">
          Recommendations
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {commonCommands.map((command, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm text-gray-600 dark:text-gray-400 hover:bg-ansys-blue/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              {command}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeechRecognition;
