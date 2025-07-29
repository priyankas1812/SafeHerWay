import React, { useState, useRef, useEffect } from "react";
import "./Css/chatPage.css";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Priyanka",
      time: "9:15 AM",
      text: "Hey there! I'm Priyanka, nice to meet you! I'm a marketing manager based in San Francisco. I love connecting with new people, especially fellow travel enthusiasts! 🌎",
      isUser: false,
    },
    {
      sender: "Varsha",
      time: "9:17 AM",
      text: "Hi Priyanka! Great to meet you too! I'm varsha, a software developer from New York. I absolutely love traveling and exploring new cultures. Always excited to chat with fellow adventurers! ✈️",
      isUser: true,
    },
  ]);

  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (message.trim() === "") return;
    const newMsg = {
      sender: "Sarah Chen",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: message,
      isUser: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div className="user-info">
          <div className="avatar">PS</div>
          <div>
            <h2>Priyanka S</h2>
            <p>Online • Banglore, Karnataka</p>
          </div>
        </div>
        <div className="app-title">Travel Chat</div>
      </div>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-msg ${msg.isUser ? "user" : "other"}`}
          >
            <div className="msg-meta">
              {!msg.isUser && <strong>{msg.sender}</strong>}
              <span>{msg.time}</span>
            </div>
            <div
              className={`msg-bubble ${
                msg.isUser ? "user-bubble" : "other-bubble"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <textarea
          rows="1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your travel thoughts..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
