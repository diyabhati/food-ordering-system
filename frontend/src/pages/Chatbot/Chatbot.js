import React, { useState } from 'react';
import './Chatbot.css'; // Import CSS file for styling

const FoodOrderingChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Define the menu items
  const menuItems = [
    { name: 'Pizza', price: '$10' },
    { name: 'Burger', price: '$8' },
    { name: 'Pasta', price: '$12' },
    // Add more menu items as needed
  ];

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessage = {
      sender: 'user',
      text: userInput,
    };

    setMessages([...messages, newMessage]);
    setUserInput('');

    // Bot response based on user input
    const botResponse = generateBotResponse(userInput);
    setMessages([...messages, botResponse]);
  };

  const generateBotResponse = (userInput) => {
    // Define some basic response patterns based on keywords
    const keywords = {
      hello: 'Hello! How can I assist you today?',
      menu: generateMenuResponse(),
      order: 'Please provide more details about your order.',
      thank: 'You are welcome! If you need any further assistance, feel free to ask.',
      default: "I'm sorry, I didn't understand that. Can you please provide more information?",
    };

    // Check for keywords in user input
    for (const keyword in keywords) {
      if (userInput.toLowerCase().includes(keyword)) {
        return {
          sender: 'bot',
          text: keywords[keyword],
        };
      }
    }

    // If no keyword matches, return default response
    return {
      sender: 'bot',
      text: keywords.default,
    };
  };

  const generateMenuResponse = () => {
    // Construct the menu response
    let response = 'Here is our menu:\n';
    menuItems.forEach((item) => {
      response += `${item.name}: ${item.price}\n`;
    });
    return response;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="header">Welcome to Chatbot!</h2>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            <p className="message-text">{message.text}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          onKeyPress={handleKeyPress}
          className="user-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default FoodOrderingChatbot;
