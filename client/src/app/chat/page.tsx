"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Chat = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { text: "I am a chatbot for task management, how can I help you?", sender: "llm" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isSending) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: inputValue, sender: "user" }
      ]);
      
      const currentInput = inputValue;
      setInputValue('');
      setIsSending(true);

      try {
        const response = await fetch('http://localhost:8080/llm/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: currentInput }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data && data.data) {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: data.data, sender: "llm" }
          ]);
        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: "Oops! Something went wrong. Please try again later.", sender: "llm" }
          ]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Oops! Something went wrong. Please try again later.", sender: "llm" }
        ]);
      } finally {
        setIsSending(false);
      }
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
          <h1 className="text-2xl font-semibold text-gray-800">AI Todo Agent</h1>
          <div className="space-x-4">
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
