import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Volume2, Sparkles, X, Minimize2, Maximize2, Loader2, Globe } from 'lucide-react';
import { ChatMessage, CitizenProfile, Language } from '../types';

interface AIChatAssistantProps {
  profile: CitizenProfile;
  language: Language;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  profile,
  language,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text:
        language === 'ta'
          ? `வணக்கம் ${profile.name}! நான் உங்கள் அரசுத் திட்ட AI உதவியாளன் (YojnaSetu AI). டிஜிலாக்கர் சான்றிதழ்கள், புதுமைப் பெண், பிஎம் கிசான் மற்றும் கலைஞர் மகளிர் உரிமைத் தொகை போன்ற திட்டங்கள் பற்றி ஏதேனும் சந்தேகம் இருந்தால் என்னிடம் கேட்கலாம்.`
          : `Hello ${profile.name}! I am your AI Smart Government Scheme Assistant. You can ask me about scheme eligibility rules, required DigiLocker certificates, or how to apply for Tamil Nadu & Central Government benefits.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6),
          profile,
          language,
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I am happy to assist you with government scheme rules and DigiLocker verification.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: language === 'ta' ? 'மன்னிக்கவும், AI சேவையைத் தொடர்புகொள்வதில் சிக்கல் ஏற்பட்டது.' : 'Sorry, encountered an issue contacting the AI assistant server.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const quickPrompts = [
    {
      en: 'Am I eligible for Pudhumai Penn scheme?',
      ta: 'புதுமைப் பெண் திட்டத்திற்கு நான் தகுதியானவளா?',
    },
    {
      en: 'What documents are required for PM-Kisan?',
      ta: 'பிஎம் கிசான் திட்டத்திற்கு என்னென்ன சான்றிதழ்கள் வேண்டும்?',
    },
    {
      en: 'How to get Income Certificate in Tamil Nadu e-Seva?',
      ta: 'தமிழ்நாட்டில் வருமானச் சான்றிதழ் பெறுவது எப்படி?',
    },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition flex items-center space-x-2 border border-emerald-400/50 cursor-pointer group"
      >
        <Sparkles className="w-6 h-6 animate-pulse text-emerald-200" />
        <span className="font-bold text-xs pr-1 hidden sm:inline">
          {language === 'ta' ? 'AI உதவி (தமிழ்)' : 'AI Scheme Assistant'}
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 transition-all duration-300 flex flex-col ${
        isMinimized
          ? 'bottom-6 right-6 w-80 h-14'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[92vw] sm:w-[420px] h-[550px] max-h-[85vh]'
      }`}
    >
      {/* Top Header */}
      <div className="bg-slate-900 text-white p-3.5 rounded-t-2xl flex justify-between items-center shrink-0 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs flex items-center space-x-1.5">
              <span>YojnaSetu AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </h3>
            <p className="text-[10px] text-slate-400">
              {language === 'ta' ? 'தமிழ் & ஆங்கிலத்தில் AI வழிகாட்டுதல்' : 'Tamil & English Scheme Advisor'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-slate-400">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold opacity-75">
                      {msg.sender === 'user' ? 'Citizen' : 'YojnaSetu AI'}
                    </span>
                    {msg.sender === 'assistant' && (
                      <button
                        onClick={() => handleSpeech(msg.text)}
                        className="text-slate-400 hover:text-emerald-600 p-0.5 cursor-pointer"
                        title="Audio Readout"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] opacity-60 block text-right mt-1">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl p-3 text-slate-500 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Gemini AI thinking in {language === 'ta' ? 'Tamil' : 'English'}...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 flex overflow-x-auto space-x-1.5 text-[11px] shrink-0">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(language === 'ta' ? qp.ta : qp.en)}
                className="whitespace-nowrap bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-lg px-2.5 py-1 text-left font-medium transition cursor-pointer shrink-0"
              >
                {language === 'ta' ? qp.ta : qp.en}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0 rounded-b-2xl"
          >
            <input
              type="text"
              placeholder={language === 'ta' ? 'உங்கள் கேள்வியை தமிழில் டைப் செய்க...' : 'Type your question in English or Tamil...'}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-2 rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};
