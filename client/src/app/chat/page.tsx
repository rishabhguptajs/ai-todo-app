"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Chat = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { text: "Hi, can you help me add a new task?", sender: "user" },
    { text: "Your task has been added successfully!", sender: "llm" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() && !isSending) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue('');
      setIsSending(true);

      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "This is a simulated response from LLM.", sender: "llm" }
        ]);
        setIsSending(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Chat Interface</h1>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "user" ? (
                <div className="bg-blue-500 text-white p-4 rounded-xl shadow-md max-w-md">
                  <p>{message.text}</p>
                </div>
              ) : (
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <span className="text-lg font-bold text-white">AI</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md max-w-md">
                    <p className="text-gray-700">{message.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-gray-100 px-6 py-4 flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={isSending}
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition"
            disabled={isSending}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
