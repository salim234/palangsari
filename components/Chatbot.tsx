
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatRole, ChatMessage } from '../types';

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === ChatRole.USER;
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${
          isUser
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};


const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isLoading, sendMessage } = useChat();
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-transform transform hover:scale-110"
                    aria-label="Open Chatbot"
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.09c.074-.355-.012-.724-.266-1.003a8.25 8.25 0 0 1-4.24-6.313A8.25 8.25 0 0 1 12 3.75c4.97 0 9 3.694 9 8.25Z" />
                        </svg>
                    )}
                </button>
            </div>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[60vh] bg-white rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out">
                    <header className="bg-emerald-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-bold text-lg">Tanya Admin Desa</h3>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((msg, index) => (
                            <ChatBubble key={index} message={msg} />
                        ))}
                         {isLoading && (
                            <div className="flex justify-start mb-4">
                                <div className="rounded-lg px-4 py-2 max-w-xs lg:max-w-md bg-gray-200 text-gray-800">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-75"></div>
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-lg">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ketik pesan Anda..."
                                className="flex-1 border rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="bg-emerald-600 text-white px-4 py-2 rounded-r-md hover:bg-emerald-700 disabled:bg-emerald-300"
                                disabled={isLoading || !input.trim()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
