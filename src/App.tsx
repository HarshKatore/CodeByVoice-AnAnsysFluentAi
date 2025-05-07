import React from 'react';
import Header from './components/Header';
import SpeechRecognition from './components/SpeechRecognition';
import CommandHistory from './components/CommandHistory';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-200">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <SpeechRecognition />
          <CommandHistory />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;