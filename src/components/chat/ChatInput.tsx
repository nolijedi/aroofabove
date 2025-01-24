// ChatInput.tsx
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

export const ChatInput = ({ onSendMessage, isTyping }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex p-3 border-t border-gray-200">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isTyping) {
            handleSubmit();
          }
        }}
        className="flex-grow p-2 border border-gray-300 rounded-lg"
        placeholder="Type your message..."
        disabled={isTyping}
      />
      <button
        onClick={handleSubmit}
        disabled={isTyping}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};
